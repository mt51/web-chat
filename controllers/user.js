const jwt = require('jsonwebtoken')
const config = require('config')
const { UserProxy } = require('../proxy')

const secret = config.get('jwt.secret')
const expire = config.get('jwt.expire')

module.exports = class UserController {
  static async list(ctx) {
    let result = []
    result = await UserProxy.list()
    ctx.body = {
      code: 0,
      data: result
    }
  }
  static async info(ctx) {
    const { id } = ctx.params
    const result = await UserProxy.getById(id)
    if (!result) {
      ctx.type = 'json'
      ctx.status = 400
      return ctx.body = {
        code: '-1',
        msg: '用户不存在'
      }
    } else {
      ctx.type = 'json'
      ctx.body = {
        code: 0,
        data: result
      }
    }
  }
  static async login(ctx) {
    const { account, password } = ctx.request.body
    const result = await UserProxy.getById(account, ['id password'])
    if (!result) {
      ctx.status = 400
      return ctx.body = {
        code: '-1',
        msg: '用户不存在'
      }
    }
    if (password !== result.password) {
      ctx.status = 400
      ctx.type = 'json'
      return ctx.body = {
        code: '-1',
        msg: '密码错误'
      }
    }
    const token = jwt.sign({account}, secret, {expiresIn: expire})
    await UserProxy.updateToken(account, token)
    ctx.body = {
      code: 0,
      data: {
        token
      }
    }
  }
}