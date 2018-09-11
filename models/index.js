const config = require('config')
const mongoose = require('mongoose')
const db = config.get('db')
console.log(db)

mongoose.Promise = global.Promise

mongoose.connect(db, {
  poolSize: 20,
  useNewUrlParser: true
}, err => {
  if (err) {
    console.error('connect to %s error: ', db, err.message)
    process.exit(1)
  }
})

module.exports = {
  User: require('./user'),
  Group: require('./group'),
  History: require('./history')
}
