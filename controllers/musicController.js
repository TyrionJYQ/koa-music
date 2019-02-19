module.exports = {
  showMusicsByUser: async(ctx, next) => {
     // 验证是否登录
     if(!ctx.session.user) return ctx.body = {code: '002', msg: '您还没有登录'};
     let { id } = ctx.session.user
    //根据用户id查询音乐数据
    let musics = await musicModel.findMusicsByUid(id);
    ctx.render('index', {musics})
  }
}