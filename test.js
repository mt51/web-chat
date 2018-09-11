const { User } = require('./models')

async function  init() {
  const result = await User.find()
  for (let i = 0; i < result.length; i++) {
    const item = result[i]
    await User.updateOne({
      id: item.id,
    }, {
      $set: {
        password: '123456'
      }
    })
  }
  process.exit(0)
}

init()