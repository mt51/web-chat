const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  groupname: String,
  id: String,
  avatar: String,
  member: Array
})

module.exports = mongoose.model('Group', schema)
