'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // const { id } = ctx.query;
    // Controller 内把变量注入到 index.html 文件，模板通过 <%-xx%>关键字获取到传入的变量。
    await ctx.render('index.html', {
      title: 'hello world!',
    });
    // ctx.body = id;
  }
  // async user() {
  //   const { ctx } = this;
  //   const { name, slogen } = await ctx.service.home.user();
  //   ctx.body = {
  //     name,
  //     slogen,
  //   };
  // }

  async user() {
    const { ctx } = this;
    const result = await ctx.service.home.user();
    ctx.body = result;
  }

  async addUser() {
    const { ctx } = this;
    const { name, age } = ctx.request.body;
    try {
      const result = await ctx.service.home.addUser(name, age);
      ctx.body = {
        code: 200,
        msg: '添加成功',
        data: result,
      };
    } catch (err) {
      ctx.body = {
        code: 500,
        msg: '添加失败, ' + err,
        data: null,
      };
    }
  }

  async editUser() {
    const { ctx } = this;
    const { id, name, age } = ctx.request.body;
    try {
      const result = await ctx.service.home.editUser(id, name, age);
      ctx.body = {
        code: 200,
        msg: '编辑成功',
        data: await ctx.service.home.user(),
      };
    } catch (err) {
      ctx.body = {
        code: 500,
        msg: '编辑失败' + err,
        data: null,
      };
    }
  }

  async delUser() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      const result = await ctx.service.home.delUser(id);
      ctx.body = {
        code: 200,
        msg: '删除成功',
        data: await ctx.service.home.user(),
      };
    } catch (err) {
      ctx.body = {
        code: 500,
        msg: '删除失败, ' + err,
      };
    }
  }
}

module.exports = HomeController;
