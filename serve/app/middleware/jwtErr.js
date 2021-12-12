/** 中间件 验证token信息
 * jewErr 方法有两个参数 ctx 是上下文，可以在 ctx 中拿到全局对象 app。

  首先，通过 ctx.request.header.authorization 获取到请求头中的 authorization 属性，它便是我们请求接口是携带的 token 值，
  如果没有携带 token，该值为字符串 null。我们通过 if 语句判断如果有 token 的情况下，
  使用 ctx.app.jwt.verify 方法验证该 token 是否存在并且有效，如果是存在且有效，则通过验证 await next() 继续执行后续的接口逻辑。
  否则判断是失效还是不存在该 token
 */
'use strict';

module.exports = secret => {
  return async function jwtErr(ctx, next) {
    const token = ctx.request.header.authorization;
    let decode;
    if (token !== 'null' && token) {
      try {
        decode = await ctx.app.jwt.verify(token, secret); // 通过 app.jwt.verify + 加密字符串 解析token的值
        await next();
      } catch (err) {
        console.log('err', err);
        ctx.status = 200;
        ctx.body = {
          msg: 'token已过期，请重新登录',
          code: 401,
        };
        return;
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        msg: 'token不存在',
        code: 401,
      };
      return;
    }
  };
};
