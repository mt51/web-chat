const { User } = require('../models')

module.exports = class userProxy {
  static updateToken(account, token) {
    return User.update({
      id: account,
    }, {
      $set: {
        token
      }
    })
  }
  
  static getById(account) {
    return User.find({
      id: account
    })
  }
}