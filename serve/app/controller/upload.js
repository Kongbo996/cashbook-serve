/**
 * 接收文件上传接口
 */

'use strict';

const fs = require('fs');
const moment = require('moment');
const mkdirp = require('mkdirp');
const path = require('path');

const Controller = require('egg').Controller;

class UploadController extends Controller {
  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0];

    /** 文件存放路径 */
    let uploadDir = '';

    try {
      const f = fs.readFileSync(file.filepath);
      console.log('f', f);
      /** 获取当前日期 */
      const day = moment(new Date()).format('YYYYMMDD');
      /** 创建图片保存路径 */
      const dir = path.join(this.config.uploadDir, day);
      const date = Date.now(); // 毫秒数
      await mkdirp(dir); // 不存在就创建目录
      // 返回图片保存路径
      uploadDir = path.join(dir, date + path.extname(file.filename));
      // 写入文件夹
      fs.writeFileSync(uploadDir, f);
      console.log(uploadDir, dir);
    } finally {
      /** 清除临时文件 */
      ctx.cleanupRequestFiles();
    }


    ctx.body = {
      code: 200,
      msg: '上传成功',
      data: uploadDir.replace(/app/g, '').replace(/\\/g, '/'),
    };
  }
}

module.exports = UploadController;
