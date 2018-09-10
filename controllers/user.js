const jwt = require('jsonwebtoken')
const config = require('config')
const { user } = require('../proxy')

const secret = config.get('jwt.secret')
const expire = config.get('jwt.expire')

module.exports = class user {
  static async list(ctx) {

  }
  static async info(ctx) {

  }
  static async login(ctx) {
    const { account, password } = ctx.request.body
    const result = user.getById(account)
    if (result.length) {
      ctx.response.status = 400
      ctx.response.body = {
        code: '-1',
        msg: '用户不存在'
      }
    }
    const token = jwt.sign({account}, secret, {expiresIn: expire})
    user.updateToken(account, token)
    ctx.response.body({
      code: 0,
      data: {
        token
      }
    })
  }
}