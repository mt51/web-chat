const { Group } = require('../models')

module.exports = class groupProxy {
  static list () {
    return Group.find()
  }

  static getById (id, columns = ['groupname', 'id', 'avatar', 'member']) {
    return Group.findOne({
      id
    }, columns.join(' '))
  }
  
  static members(id) {
    return Group.findOne({
      id
    }, 'member')
  }
}
