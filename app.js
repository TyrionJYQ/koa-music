const Koa = require('koa');
const render = require('koa-art-template');
const path = require('path');
const app = new Koa();
const db = require('./db')


// art-template
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  // 获取环境变量中的NODE_ENV: true : debug 开发
  // 1:  不压缩，不混淆 ，实时更新静态页面
  debug: process.env.NODE_ENV !== 'production'   //  压缩，混淆 ，不重启服务器不更新静态页面
});

// 引入路由并配置中间件
const musicRouter = require('./routers/musicRouter');
const userRouter = require('./routers/userRouter');

// 静态资源路径处理
app.use(async(ctx, next) => {
  if(ctx.url.startsWith('/public')) {
    ctx.url = ctx.url.replace('/public', '');
  }
  await next();
});

// 处理静态资源
app.use(require('koa-static')(path.resolve('./public')));


app.use(musicRouter.routes())
app.use(userRouter.routes())

// 请求方法错误返回405, 请求方式未实现返回501
app.use(musicRouter.allowedMethods())
app.use(userRouter.allowedMethods())















app.listen(8888, () => console.log('server start success, 8888'))














app.use(async (ctx, next) => {
  try {
    var [{username}] = await db.query('SELECT * FROM users WHERE id = ?', [1])
  } catch (e) {
    console.error(e)
  }
  ctx.render('index', {
    title: `欢迎用户${username}来到koa-music`
  })
})