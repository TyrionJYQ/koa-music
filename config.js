module.exports = {
  rewriteUrlArray: [
    {src: '/a', dist: '/user/login'},
    {regex: /\/public\/(.*)/},  // 解决前端路径中多余的/public
    {regex: /^\/xx/, dist: '/user/login'},
    {src: '/', dist: '/user/login'},
  ],
  port: 8888,
  dbConfig: {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'koa_music'
  },
  sessionConfig: {
    key: 'koa:sess', // cookie名称 
    maxAge: 86400000, // 过期时间(毫秒)
    autoCommit: true, 
    overwrite: true, 
    httpOnly: true, // true客户端无法访问cookie
    signed: true,   // 数据签名
    rolling: false, // 顺延cookie的有效期
    renew: false
  },
  sessionKey: 'koa music'
}