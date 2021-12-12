/**
 * 用户相关接口
 */

'use strict';

const Controller = require('egg').Controller;

const defaultAvatar = 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png';

class UserController extends Controller {
  async register() {

    const { ctx } = this;
    const { username, password } = ctx.request.body;

    if (!username || !password) {
      ctx.body = {
        msg: '账号密码不能为空',
        code: 500,
        data: null,
      };
      return;
    }

    const userInfo = await ctx.service.user.getUserByName(username);
    if (userInfo && userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '账户名已被注册，请重新输入',
        data: null,
      };
      return;
    }

    const result = await ctx.service.user.register({
      username,
      password,
      signature: 'hello world',
      avatar: defaultAvatar,
      createtime: new Date().getTime(),
    });

    if (result) {
      ctx.body = {
        code: 200,
        data: null,
        msg: '注册成功',
      };
    } else {
      ctx.body = {
        code: 500,
        data: null,
        msg: '注册失败',
      };
    }
  }

  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    /** 根据username获取用户详细信息 */
    const userInfo = await ctx.service.user.getUserByName(username);
    if (!userInfo && !userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '账号不存在',
        data: null,
      };
      return;
    }
    if (userInfo && password !== userInfo.password) {
      ctx.body = {
        code: 500,
        msg: '密码错误',
        data: null,
      };
      return;
    }

    /** 设置token
     * app.jwt.sign 方法接受两个参数，第一个为要加密的信息，第二个是加密字符串
     */
    const token = app.jwt.sign({
      id: userInfo.id,
      username: userInfo.username,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 有效期24小时
    }, app.config.jwt.secret);
    ctx.append('token', token);
    // 配置允许添加的请求头
    // ctx.request.setHeader('Access-Control-Allow-Headers', 'token');
    ctx.body = {
      code: 200,
      msg: '登陆成功',
      data: null,
    };
  }

  async test() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization; // 获取请求头authorization属性
    /** 通过 app.jwt.verify + 加密字符串 解析token的值 */
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    ctx.body = {
      code: 200,
      message: '获取成功',
      data: {
        ...decode,
      },
    };
  }

  async getUserInfo() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization;
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    const userInfo = await ctx.service.user.getUserByName(decode.username);
    ctx.body = {
      code: 200,
      msg: '请求成功',
      data: {
        id: userInfo.id,
        username: userInfo.username,
        signature: userInfo.signature || '',
        avatar: userInfo.avatar || defaultAvatar,
      },
    };
  }

  /** 编辑个人信息 */
  async editUserInfo() {
    const { ctx, app } = this;
    const { signature = '', avatar = '' } = ctx.request.body;

    try {
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;
      const user_id = decode.id;
      const userInfo = await ctx.service.user.getUserByName(decode.username);
      const result = await ctx.service.user.editUserInfo({
        ...userInfo,
        signature,
        avatar,
      });
      console.log(result, 'result');
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          id: user_id,
          signature,
          username: userInfo.username,
          avatar,
        },
      };
    } catch (err) {
      console.log(err, 'err');
    }
  }
}

module.exports = UserController;
