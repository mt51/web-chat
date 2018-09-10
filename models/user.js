const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  username: String,
  id: String,
  avatar: String,
  token: String,
  password: String
})

module.exports = mongoose.model('User', schema)
