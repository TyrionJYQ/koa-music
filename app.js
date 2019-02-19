const Koa = require('koa');
const { port, rewriteUrlArray} = require('./config')
// 创建服务器对象
let app = new Koa(); 

// 监听端口
app.listen(port,()=>{
    console.log(`服务器成功启动，端口号为${port}`);
});
// art-template
const render = require('koa-art-template');
const path = require('path');

render(app, {
  root: path.join(__dirname, 'views'), // 模板查找路径views
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
app.use(require('koa-bodyparser')());

const rewriteUrl = require('./middlewars/rewriteUrl');
app.use(rewriteUrl(rewriteUrlArray));

// 处理静态资源,path.resolve将相对路径变为绝对路径
app.use(require('koa-static')(path.resolve('./public') ));

// session start
const session = require('koa-session');
let {sessionConfig, sessionKey} = require('./config')
app.keys = [sessionKey]
app.use(session(sessionConfig, app));
// session end

// 路由
app.use(musicRouter.routes());
app.use(userRouter.routes());

// 原本配置了/a 的get请求方式,但你用了post请求方式, 返回404, 
// 以下配置可以返回405  方法不匹配
// 如果客户端使用了元·服务器不能支持的请求方式 比如copy, 返回404
// 以下配置可以返回501  方法未实现
app.use(userRouter.allowedMethods() );








// const db = require('./db.js');

// app.use(async (ctx,next)=>{
//   let user;
//     // 查询数据库  结果是一个数组
//     // 1: await 对应 resolve(参数)
//     // 2: reject(????)
//     try {
//        user= (await db.q('select * from users where id = ?',[1]))[0].username;

//       console.log(user);
//       // ctx.body = 'haha'; // 响应数据
//       await ctx.render('index.html',{
//           msg:user
//       });
//     } catch (e) {
//       // 对应reject(err)
//       console.log(e);
//     }   
// });