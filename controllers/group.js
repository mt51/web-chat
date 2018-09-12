const { GroupProxy } = require('../proxy')
module.exports = class groupController {
  static async list(ctx) {
    const result = await GroupProxy.list()
    ctx.type = 'json'
    ctx.body = {
      code: 0,
      data:result
    }
  }
  static async info(ctx) {
    const { id } = ctx.params
    const result = await GroupProxy.getById(id)
    ctx.type = 'json'
    if (!result) {
      ctx.status = 400
      return ctx.body = {
        code: -1,
        mag: '群组不存在'
      }
    }
    ctx.body = {
      code: 0,
      data: result
    }
  }
  static async member(ctx) {
    const { id } = ctx.params
    const result = await GroupProxy.members(id)
    ctx.type = 'json'
    if (!result) {
      ctx.status = 400
      return ctx.body = {
        code: -1,
        mag: '群组不存在'
      }
    }
    ctx.body = {
      code: 0,
      data: result
    }
  }
}