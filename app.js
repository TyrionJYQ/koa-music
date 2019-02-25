const Koa = require('koa');
const {
  port,
  rewriteUrlArray,
  sessionConfig,
  sessionKey,
  routeList,
  renderRootDir,
  staticDir,
  uploadDir } = require('./config');
// 创建服务器对象
let app = new Koa();

// 监听端口
app.listen(port, () => {
  console.log(`服务器成功启动，端口号为${port}`);
});
// art-template
const render = require('koa-art-template');
render(app, {
  root: renderRootDir, // 模板查找路径views
  extname: '.html',
  // 获取环境变量中的NODE_ENV: true : debug 开发
  //    1:  不压缩，不混淆 ，实时更新静态页面
  //    2: debug === false压缩，混淆 ，不实时更新静态页面
  debug: process.env.NODE_ENV !== 'production',
});





// 引入各个路由对象，并配置中间件
const musicRouter = require('./routers/musicRouter');
const userRouter = require('./routers/userRouter');
const errorHandler = require('./middlewars/errorHandler');

// 请求错误处理
app.use(errorHandler)

// 解析请求体数据
// app.use(require('koa-bodyparser')()); 与koa-formidable产生冲突，都包含ctx.request

const rewriteUrl = require('./middlewars/rewriteUrl');
app.use(rewriteUrl(rewriteUrlArray));

// 处理静态资源,path.resolve将相对路径变为绝对路径
app.use(require('koa-static')(staticDir));

// handle session start

const session = require('koa-session');

app.keys = [sessionKey]
let store = {
  storage: {},
  set: function (key, session) {
    this.storage[key] = session;
  },
  get: function (key) {
    return this.storage[key];
  },
  destroy: function (key) {
    // 通过客户都的cookie钥匙删除session数据
    delete this.storage[key];
  }
};
sessionConfig.store = store;
app.use(session(sessionConfig, app));

// handle session end

// 登录验证
const checkLogin = require('./middlewars/checkLogin')
app.use(checkLogin(routeList))

// 上传文件
const formidable = require('koa-formidable');
app.use(formidable({
  uploadDir, keepExtensions: true // 保持文件后缀名
}))

// 回写session
app.use(async function (ctx, next) {
  // ctx.state: art-template的视图对象
  ctx.state.user = ctx.session.user; 
  await next();
})
// 路由
app.use(musicRouter.routes());
app.use(userRouter.routes());

// 原本配置了/a 的get请求方式,但你用了post请求方式, 返回404, 
// 以下配置可以返回405  方法不匹配
// 如果客户端使用了元·服务器不能支持的请求方式 比如copy, 返回404
// 以下配置可以返回501  方法未实现
app.use(userRouter.allowedMethods());








