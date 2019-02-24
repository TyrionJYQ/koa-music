const musicModel = require("../models/musicModel");
const path = require('path')
module.exports = {
  showMusicsByUser: async (ctx, next) => {
    // 验证是否登录
    if (!ctx.session.user) return ctx.body = { code: '002', msg: '您还没有登录' };
    let { id } = ctx.session.user;
    //根据用户id查询音乐数据
    let musics = await musicModel.findMusicsByUid(id);
    console.log('查找到的音乐列表为', musics);
    ctx.render('index', { musics });
  },
  addMusic: async (ctx, next) => {
    // 接收上传音乐的数据(koa-formidable)
    let { title, singer, time } = ctx.request.body;
    let { file, filelrc } = ctx.request.files;
    let filePath, lrcPath;
    // 解析路径
    if (file) {
      filePath = path.parse(file.path).base;
      filePath = '/public/files' + filePath;
    }
    if (filelrc) {
      lrcPath = path.parse(filelrc.path).base;
      lrcPath = '/public/files' + lrcPath;
    }
    // 获取歌曲uid即用户id
    let uid = ctx.session.user.id;
    // 将歌曲插入到数据库
    console.log(filePath)
    console.log(lrcPath)
    let result = await musicModel.addMusicByMusicInfo(title, singer, time, filePath, lrcPath, uid);
    if (result.affectedRows !== 1) return ctx.throw(new Error(result.message))
    ctx.body = { code: '001', msg: '上传成功!' }
  },
  showEditMusic: async (ctx, next) => {
    // GET请求的参数不能通过ctx.request.body来获取
    let { id } = ctx.query;
    let musics = await musicModel.findMusicsByid(id);
    if (musics.length === 0) return ctx.throw('音乐不存在');
    await ctx.render('edit', {
      music: musics[0]
    })
  },
  updateMusic: async (ctx, next) => {
    let { id, title, singer, time } = ctx.request.body;
    let { file, filelrc } = ctx.request.files;
    if (!file || !filelrc) return ctx.throw('未选择音乐或歌词文件');
    let filePath, lrcPath;
    // 歌曲路径
    filePath = path.parse(file.path).base;
    filePath = '/public/files' + filePath;
    // 歌词路径
    lrcPath = path.parse(filelrc.path).base;
    lrcPath = '/public/files' + lrcPath;
    // 根据id查询数据库
    let result = await musicModel.updateMusic(title, singer, time, filePath, lrcPath, id);
    if (result.affectedRows !== 1) return ctx.throw(result.message);
    ctx.body = { code: '001', msg: '更新成功' };
  },

  // 删除音乐
  deleteMusic: async (ctx, next) => {
    let { id } = ctx.query;
    let result = await musicModel.deleteMusic(id)
    if (result.affectedRows !== 1) return ctx.throw(result.message);
    ctx.body = { code: '001', msg: '删除成功' };


  }
}