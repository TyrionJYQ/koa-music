const Koa = require('koa');
const render = require('koa-art-template');
const path = require('path');
const app = new Koa();
const db = require('./db')


// art-template
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});


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