const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  content: String,
  username: String,
  avatar: String,
  sender: String,
  recver: String,
  time: Date,
  sendername: String,
  recvername: String
})

module.exports = mongoose.model('History', schema)
