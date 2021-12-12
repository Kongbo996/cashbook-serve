'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  /** 获取用户信息 */
  async getUserByName(username) {
    const { app } = this;
    try {
      const result = await app.mysql.get('user', { username });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /** 注册 */
  async register(params) {
    const { app } = this;
    try {
      const result = await app.mysql.insert('user', params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /** 编辑用户信息 */
  async editUserInfo(params) {
    const { app } = this;
    try {
      const result = await app.mysql.update('user', {
        ...params,
      }, {
        id: params.id,
      });
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = UserService;
