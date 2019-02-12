const Router = require('koa-router');
let router = new Router();

router.get('/music/index', (ctx, next) => {
  ctx.render('index')
})
.get('/music/addMusic', (ctx, next) => {
  ctx.render('add')
})
.get('/music/editMusic', (ctx, next) => {
  ctx.render('edit')
});

module.exports = router;