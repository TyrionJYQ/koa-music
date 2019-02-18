module.exports = async(ctx, next) => {
  try {
    await next()
  } catch(err) {
    console.log(err)
    ctx.body = `
      <div>出错啦。。。</div>
    `
  }
}