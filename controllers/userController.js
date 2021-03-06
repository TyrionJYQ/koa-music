const obj = {};
const userModel = require('../models/userModel');
const captchapng = require('captchapng2');
// 验证用户名是否存在
obj.checkUsername = async (ctx,next) => {
    // 1: 接收请求体的username
    let { username } = ctx.request.body;
    // 2: 根据username查询数据库
    let users = await userModel.findUserByUsername(username);
    // 3: 根据查询结果来响应客户端 ctx.body = {code:'001'}
    if(users.length === 0) return ctx.body = { code:'001',msg:'可以注册'};
    ctx.body = { code:'002',msg:'用户名已经存在'};
}
// 注册
obj.doRegister = async ctx => {
  let {username, password, email, v_code} = ctx.request.body
  //判断验证码v_code,因为不用查询数据库所以放在前面
  if(ctx.session.v_code != v_code) {
    return ctx.body = {code: '002', msg: '验证码不正确'};
  }
  // 验证邮箱合法性
  // 查询数据库，判断用户是否存在
  let users = await userModel.findUserByUsername(username);
  // 用户存在
  if(users && users.length !== 0) return ctx.body = {code: '002', msg: '用户名已经存在'};
  // 用户不存在，向数据库中插入该数据
  let result = await userModel.addUser([username, password, email]);
  console.log(result);
  if (result.affectedRows !== 1) return ctx.throw(new Error(result.message))
  ctx.body = {code: '001', msg: '注册成功!'}
}
//登录
obj.doLogin = async ctx => {
  let {username, password} = ctx.request.body;
  let users = await userModel.findUserByUsername(username);
  if(users.length === 0) return ctx.body = {code: '002', msg: '用户名或密码不正确'};
  let user = users[0];
  if(user.password !== password) return ctx.body = {code: '002', msg: '用户名或者密码不正确'};
  ctx.body = {code: '001', msg: '登录成功'};
  ctx.session.user = user 
}

obj.getCaptcha = async ctx => {
  let rand = parseInt(Math.random() * 9000 + 1000);
  let png = new captchapng(80, 30, rand); // width,height, numeric captcha
  ctx.session.v_code = rand;
  ctx.body = png.getBuffer();
}

// 登出
obj.doLogout = async ctx => {
  // 清除session
  ctx.session = null;
  ctx.redirect('/user/login');
}


module.exports = obj;