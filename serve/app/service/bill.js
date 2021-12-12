'use strict';

const Service = require('egg').Service;

class BillService extends Service {
  async add(params) {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.insert('bill', params);
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  /** 获取帐单列表 */
  async list(id, typeId) {
    const { ctx, app } = this;
    // const QUERY_STR = 'id, pay_type, amount, date, type_id, type_name, remark';
    let sql;
    if (typeId === 0) {
      sql = `select * from bill where user_id=${id}`;
    } else {
      sql = `select * from bill where user_id=${id} and type_id=${typeId}`;
    }
    try {
      const result = await app.mysql.query(sql);
      return result;
    } catch (err) {
      return null;
    }
  }

  /** 获取账单详情 */
  async detail(id, user_id) {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.get('bill', { id, user_id });
      return result;
    } catch (err) {
      return null;
    }
  }

  /** 编辑账单 */
  async update(params) {
    const { app } = this;
    try {
      const result = await app.mysql.update('bill', { ...params }, { id: params.id, user_id: params.user_id });
      console.log('result: ', result);
      return result;
    } catch (err) {
      return null;
    }
  }

  /** 删除账单 */
  async delete({ id, user_id }) {
    const { app } = this;
    try {
      const result = await app.mysql.delete('bill', { id, user_id });
      return result;
    } catch (err) {
      return null;
    }
  }

  async data(user_id) {
    const { app } = this;
    try {
      const QUERY_STR = '*';
      const sql = `select ${QUERY_STR} from bill where user_id = ${user_id}`;
      const result = await app.mysql.query(sql);
      return result;
    } catch (err) {
      return null;
    }
  }
}

module.exports = BillService;
