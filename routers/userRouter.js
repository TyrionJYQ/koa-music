const Router = require('koa-router');
let router = new Router();

router.get('/user/register', (ctx, next) => ctx.render('register'))
.get('/user/login', (ctx, next) => ctx.render('login'));

module.exports = router;

