'use strict';

const Controller = require('egg').Controller;

class UploadController extends Controller {
  async upload() {
    const { ctx } = this;
    const result = await ctx.service.upload.dealFile(ctx, this.app);

    return result && (
      ctx.body = {
        status: 200,
        msg: 'complete',
      });
  }
}
module.exports = UploadController;
