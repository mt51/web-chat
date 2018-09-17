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
    console.log(token)
    return User.find({
      token: {
        $nor: token
      }
    })
  }
}