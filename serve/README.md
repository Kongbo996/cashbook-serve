# cashbook-serve



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org

### 安装的插件介绍
- npm install egg-view-ejs -save 前端模板

  ejs: {
    enable: true,
    package: 'egg-view-ejs'
  },

### mysql安装 

- mysqld --install // 安装
- mysqld --initialize-insecure --user=mysql 生成data目录
- net start mysql 启动
- cd C:\Program Files\mysql-8.0.26-winx64

- npm install egg-mysql
- config/plugin.js 添加插件配置：
  mysql: {
    enable: true,
    package: 'egg-mysql'
  }

- npm i egg-jwt -S 
https://github.com/okoala/egg-jwt#readme