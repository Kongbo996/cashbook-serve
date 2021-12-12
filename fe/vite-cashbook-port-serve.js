/** 通过pushstate-server 插件配置启动web服务的配置 */

const server = require('pushstate-server')

server.start({
  port: 7778,
  directory: './dist'
})