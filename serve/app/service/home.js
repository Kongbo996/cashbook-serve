'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  /** 查询list列表 */
  async user() {
    const { app } = this;
    const QUERY_STR = 'id, name, age';
    const sql = `select ${QUERY_STR} from list`; // 获取 id 的 sql 语句
    try {
      const result = await app.mysql.query(sql); // mysql 实例已经挂载到 app 对象下，可以通过 app.mysql 获取到。
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /** list中添加一条数据 */
  async addUser(name, age = null) {
    const { app } = this;
    try {
      const result = await app.mysql.insert('list', { name, age });
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  /** list中编辑某条数据 */
  async editUser(id, name, age = null) {
    const { app } = this;
    try {
      const result = await app.mysql.update('list', { name, age }, {
        where: {
          id,
        },
      });
      return result;
    } catch (err) {
      return err;
    }
  }

  /** list中删除某条数据 */
  async delUser(id) {
    const { app } = this;
    try {
      const result = await app.mysql.delete('list', { id });
      return result;
    } catch (err) {
      return err;
    }
  }
}

module.exports = HomeService;
