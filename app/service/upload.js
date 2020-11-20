'use strict';

const Service = require('egg').Service;
const path = require('path');
const fs = require('fs');
const unzipper = require('unzipper');
const projectPath = '../public';

class Upload extends Service {
  async dealFile(ctx) {
    const file = ctx.request.files[0];
    console.log(file);
    const filePath = path.resolve(__dirname, projectPath, file.filename);
    const reader = fs.createReadStream(file.filepath);
    const writer = fs.createWriteStream(
      // 文件上传到 public 文件夹中
      filePath
    );

    return new Promise(resolve => {

      reader.pipe(writer);

      reader.on('end', async () => {
        await this.unzip(filePath);
        resolve(true);
      });

      reader.on('error', err => {
        throw err;
      });
    });
  }
  async unzip(filePath) {
    const file = path.resolve(__dirname, projectPath);
    fs.createReadStream(filePath).pipe(unzipper.Extract({ path: file }));
    return fs.unlinkSync(filePath);
  }
}
module.exports = Upload;
