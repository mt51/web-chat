const { HistoryProxy } = require('../proxy')

module.exports = class history {
  static async list(ctx) {
    ctx.type = 'json'
    const { sender, recver } = ctx.params
    ctx.status = 400
    if (!sender || !recver) {
      return ctx.body = {
        code: '-1',
        mag: '参数错误'
      }
    }
    const { page = 1, size = 10 } = ctx.request.body
    const result = await HistoryProxy.list(sender, recver, page, size)
    const count = await HistoryProxy.count()
    ctx.body = {
      code: 0,
      data: {
        list: result,
        total: count,
        page,
        size
      }
    }
  }
  static async add(ctx) {
    const message = ctx.request.body
    await HistoryProxy.add(message)
    ctx.type = 'json'
    ctx.body = {
      code: 0,
      msg: '保存成功'
    }
  }
}