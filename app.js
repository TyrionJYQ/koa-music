const Koa = require('koa');
const render = require('koa-art-template');
const path = require('path');
const app = new Koa();


// art-template
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});


app.listen(8888, () => console.log('server start success, 8888'))

app.use((ctx, next) => ctx.render('index.html', {
  title: '欢迎来到koa-music'
}))