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
  
  static getById(account) {
    return User.find({
      id: account
    })
  }

  static list () {
    return User.find().then(data => {
      console.log(data)
    })
  }
}