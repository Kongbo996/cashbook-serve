'use strict';

const Service = require('egg').Service;

class TypeSevice extends Service {
  async list(id) {
    const { app } = this;
    const sql = `select * from type where user_id in (0,${id})`;
    try {
      const result = await app.mysql.query(sql);
      return result;
    } catch (err) {
      return null;
    }
  }
}

module.exports = TypeSevice;
