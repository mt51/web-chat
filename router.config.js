const Router = require('koa-router')
const {user, history, group } = require('./controllers')

const router = new Router()

router.get('/user/list', user.list)
.get('/user/:id', user.info)
.post('/login', user.login)
.get('/group/list', group.list)
.get('/group/:id', group.info)
.get('/group/:id/member', group.member)
.get('/history/:sender/:recver:', history.list)

module.exports = router