/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1635685629637_3538';

  // add your middleware config here
  config.middleware = [];

  // 全局声明
  const userConfig = {
    // myAppName: 'egg',
    uploadDir: 'app/public/upload',
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ],
  };

  exports.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '10.0.4.10', //  81.68.165.190
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456', // 初始化密码，没设置的可以不写
      // 数据库名
      database: 'cost', // 我们新建的数据库名称
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.view = {
    mapping: { '.html': 'ejs' },
  };

  config.jwt = {
    secret: 'hello world', // 加密字符串
  };

  /** egg 提供两种文件接收模式，1 是 file 直接读取，2 是 stream 流的方式。
   * 我们采用比较熟悉的 file 形式。所以需要前往 config/config.default.js 配置好接收形式.
   * https://eggjs.github.io/zh/guide/upload.html
   *  */
  config.multipart = {
    mode: 'file',
  };

  config.cors = {
    origin: '*',
    credentials: true, // 允许cookie跨域
    allowMethods: 'GET,POST,PUT,HEAD,DELETE,PATCH',
  };
  
  config.cluster = {
    listen: {
      path: '',
      port: 7777,
	    hostname: '0.0.0.0'
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};

