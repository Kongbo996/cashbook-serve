/**
 * 获取该用户下的类型列表
 */

'use strict';

const Controller = require('egg').Controller;

class TypeController extends Controller {
  async list() {
    const { ctx, app } = this;
    try {
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;
      const user_id = decode.id;
      console.log(decode);
      const list = await ctx.service.type.list(user_id);
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          total: list.length || 0,
          list,
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
}

module.exports = TypeController;
