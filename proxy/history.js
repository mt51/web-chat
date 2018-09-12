const { History } = require('../models')

module.exports = class historyProxy {
  static list(sender, recver, page, size) {
    page = parseInt(page)
    size = parseInt(size)
    return History.find({
      sender,
      recver
    }).sort('time').skip((page - 1) * size).limit(size).exec()
  }

  static add(message) {
    const newMsg = new History(message)
    return newMsg.save()
  }
  static count () {
    return History.countDocuments()
  }
}
