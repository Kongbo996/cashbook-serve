'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret);
  router.get('/', controller.home.index);
  // router.get('/user', controller.home.user);
  // router.post('/addUser', controller.home.addUser);
  // router.post('/editUser', controller.home.editUser);
  // router.post('/delUser', controller.home.delUser);
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/test', _jwt, controller.user.test);
  router.get('/api/user/userInfo', _jwt, controller.user.getUserInfo);
  router.post('/api/user/edtiSignature', _jwt, controller.user.editUserInfo);
  router.post('/api/upload', controller.upload.upload);

  router.post('/api/bill/add', _jwt, controller.bill.add);
  router.get('/api/bill/list', _jwt, controller.bill.list);
  router.get('/api/bill/detail', _jwt, controller.bill.detail);
  router.post('/api/bill/update', _jwt, controller.bill.update);
  router.get('/api/bill/delete', _jwt, controller.bill.delete);
  router.get('/api/bill/data', _jwt, controller.bill.data);

  router.get('/api/type/list', _jwt, controller.type.list);
};
