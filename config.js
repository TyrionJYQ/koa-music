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
    database: 'node_music'
  }
}