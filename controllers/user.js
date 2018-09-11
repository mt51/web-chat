const jwt = require('jsonwebtoken')
const config = require('config')
const { UserProxy } = require('../proxy')

const secret = config.get('jwt.secret')
const expire = config.get('jwt.expire')

module.exports = class UserController {
  static async list(ctx) {
    let result = null
    result = await UserProxy.list()
    ctx.body = {
      code: 0,
      data: result
    }
  }
  static async info(ctx) {

  }
  static async login(ctx) {
    const { account, password } = ctx.request.body
    const result = UserProxy.getById(account)
    if (result.length) {
      ctx.response.status = 400
      ctx.response.body = {
        code: '-1',
        msg: '用户不存在'
      }
    }
    const token = jwt.sign({account}, secret, {expiresIn: expire})
    UserProxy.updateToken(account, token)
    ctx.body({
      code: 0,
      data: {
        token
      }
    })
  }
}