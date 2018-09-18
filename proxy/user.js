const { User } = require('../models')

module.exports = class userProxy {
  static updateToken(account, token) {
    return User.updateOne({
      id: account,
    }, {
      $set: {
        token
      }
    })
  }
  
  static getById(account, columns = ['id', 'username', 'avatar']) {
    return User.findOne({
      id: account
    }, columns.join(' '))
  }

  static list (token) {
    return User.find({
      token: {
        $ne: token
      }
    }, {'id': 1, 'username': 1, 'avatar': 1, '_id': 0})
  }
}