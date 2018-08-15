const jwt = require('jsonwebtoken')
module.exports = () => {
  return async function auth(ctx, next) {
    try {
      let decode = jwt.verify(ctx.get('Authorization'), ctx.app.config.jwt.cert)
      ctx.userId = decode.id
    } catch (err) {
      console.log(err)
      ctx.status = 401
      ctx.body = {
        errcode: 1,
        msg: '授权失败，请重新登录'
      }
      return
    }
    await next() // 这里因为next之后的操作是异步的所以需要加 await
  };
};
