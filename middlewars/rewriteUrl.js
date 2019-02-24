// {src: '/c', dist:"/d"},
// {regex: /\/public\/(.*)/}
module.exports = rules => {
  console.log(rules)
  return async (ctx, next) => {
    console.log(ctx)
    rules.forEach(rule => {
      // 正则判断
      if (rule.regex) {
        let result = rule.regex.exec(ctx.url)
        if (result) {
          if (rule.dist) {
            ctx.url = rule.dist
          } else {
            // result[1]是分组内容
            ctx.url = `/${result[1]}`
          }
        }
      }
      // 处理src=> dist
      if (ctx.url === rule.src) {
        console.log(rule)
        ctx.url = rule.dist;
      }
    })
    await next();
  }
}