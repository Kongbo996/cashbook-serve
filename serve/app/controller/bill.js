/**
 * 账单相关接口
 */

'use strict';

const Controller = require('egg').Controller;
const moment = require('moment');

class BillController extends Controller {

  /** 添加一条账单 */
  async add() {
    const { ctx, app } = this;
    const { pay_type, amount, type_id, type_name, remark = '' } = ctx.request.body;
    if (!amount || !type_id || !type_name || !pay_type) {
      ctx.body = {
        data: null,
        code: 400,
        msg: '参数错误',
      };
    }
    try {
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;
      const user_id = decode.id;
      await ctx.service.bill.add({
        amount,
        type_id,
        type_name,
        date: new Date().getTime(),
        pay_type,
        remark,
        user_id,
      });
      ctx.body = {
        code: 200,
        date: null,
        msg: '添加成功',
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        code: 500,
        date: null,
        msg: '系统错误',
      };
    }
  }

  /** 账单列表 */
  async list() {
    const { ctx, app } = this;
    const { date, page = 1, page_size = 5, type_id = 'all' } = ctx.query;
    try {
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;
      const user_id = decode.id;
      const typeId = type_id === 'all' ? 0 : type_id;
      /** 拿到当前用户的帐单列表 */
      const list = await ctx.service.bill.list(user_id, typeId);
      /** 对账单列表进行过滤 类型和日期一致的 */
      const _list = list.filter(item => {
        if (type_id !== 'all') {
          return moment(Number(item.date)).format('YYYY-MM') == date && type_id == item.type_id;
        }
        return moment(Number(item.date)).format('YYYY-MM') == date;
      });

      /** 格式化数据 按日期YYYY-MM-DD 将账单进行分类 */
      const listMap = _list.reduce((curr, item) => {
        const date = moment(Number(item.date)).format('YYYY-MM-DD');
        const index = curr.findIndex(i => i.date == date);
        if (curr && curr.length && index > -1) {
          curr[index].bills.push(item);
        }
        if (curr && curr.length && index === -1) {
          curr.push({
            date,
            bills: [ item ],
          });
        }
        if (!curr.length) {
          curr.push({
            date,
            bills: [ item ],
          });
        }
        return curr;
      }, []).sort((a, b) => moment(b.date) - moment(a.date)); // 时间倒序
      /** 分页处理 */
      const filterListMap = listMap.slice((page - 1) * page_size, page * page_size);
      /** 筛选出目标date(年月)的账单集合 */
      const MonthBillList = list.filter(i => moment(Number(i.date)).format('YYYY-MM') == date);

      /** 计算累计支出 */
      const totalExpense = MonthBillList.reduce((curr, item) => {
        if (+item.pay_type === 1) {
          curr += Number(item.amount);
          return curr;
        }
        return curr;
      }, 0);

      const totalIncome = MonthBillList.reduce((curr, item) => {
        if (+item.pay_type === 2) {
          curr += Number(item.amount);
          return curr;
        }
        return curr;
      }, 0);
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          totalExpense,
          totalIncome,
          total: listMap.length,
          list: filterListMap || [],
        },
      };
    } catch (err) {
      ctx.body = {
        msg: '系统错误',
        data: null,
        code: 500,
      };
    }
  }

  async detail() {
    const { ctx, app } = this;
    const { id = '' } = ctx.query;
    const token = ctx.request.header.authorization;
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    if (!decode) return;
    const user_id = decode.id;
    if (!id) {
      ctx.body = {
        msg: '订单id不能为空',
        data: null,
        code: 500,
      };
      return;
    }

    try {
      const detail = await ctx.service.bill.detail(id, user_id);
      ctx.body = {
        data: detail,
        msg: '请求成功',
        code: 200,
      };
    } catch (err) {
      ctx.body = {
        msg: '系统错误',
        data: null,
        code: 500,
      };
    }
  }

  /** 编辑账单 */
  async update() {
    const { ctx, app } = this;
    const { id, pay_type, amount, type_id, type_name, remark = '' } = ctx.request.body;
    if (!pay_type || !amount || !type_id || !type_name || !remark) {
      ctx.body = {
        msg: '参数错误',
        data: null,
        code: 500,
      };
      return;
    }

    try {
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      const user_id = decode.id;
      if (!decode) return;
      const params = {
        id,
        pay_type,
        amount,
        type_name,
        type_id,
        remark,
        date: new Date().getTime(),
        user_id,
      };
      const result = await ctx.service.bill.update(params);
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: result,
      };

    } catch (err) {
      ctx.body = {
        data: null,
        code: 500,
        msg: '系统错误',
      };
    }
  }

  /** 删除账单 */
  async delete() {
    const { ctx, app } = this;
    const { id = '' } = ctx.query;
    if (!id) {
      ctx.body = {
        code: 500,
        msg: '参数错误',
        data: null,
      };
      return;
    }
    try {
      const token = ctx.request.header.authorization;
      const decode = app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;
      await ctx.service.bill.delete({ id, user_id: decode.user_id });
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: null,
      };

    } catch (err) {
      ctx.body = {
        data: null,
        msg: '系统错误',
        code: 500,
      };
    }
  }

  async data() {
    const { ctx, app } = this;
    const { date = '' } = ctx.query;
    try {
      const token = ctx.request.header.authorization;
      const decode = app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;
      const user_id = decode.id;
      const result = await ctx.service.bill.data(user_id);
      const start = moment(date).startOf('month').unix() * 1000;
      const end = moment(date).endOf('month').unix() * 1000;
      console.log(start, end, result[0].date);
      const _data = result.filter(item => (+item.date > start && (+item.date) < end));
      /** 总支出 */
      const total_expense = _data.reduce((arr, cur) => {
        if (+cur.pay_type === 1) {
          arr += Number(cur.amount);
        }
        return arr;
      }, 0);
      // 总收入
      const total_income = _data.reduce((arr, cur) => {
        if (+cur.pay_type === 2) {
          arr += Number(cur.amount);
        }
        return arr;
      }, 0);
      // 获取收支构成
      let total_data = _data.reduce((arr, cur) => {
        const index = arr.findIndex(item => item.type_id === cur.type_id);
        if (index === -1) {
          arr.push({
            type_id: cur.type_id,
            type_name: cur.type_name,
            pay_type: cur.pay_type,
            number: Number(cur.amount),
          });
        }
        if (index > -1) {
          arr[index].number += Number(cur.amount);
        }
        return arr;
      }, []);

      total_data = total_data.map(item => {
        item.number = Number(item.number).toFixed(2);
        return item;
      });
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          total_expense: Number(total_expense).toFixed(2),
          total_income: Number(total_income).toFixed(2),
          total_data: total_data || [],
        },
      };

    } catch (err) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null,
      };
    }
  }

}

module.exports = BillController;
