const Router = require('koa-router')
const {user, history, group } = require('./controllers')

const router = new Router()

router.get('/user', user.list)
.get('/user/:id', user.info)
.post('/login', user.login)
.get('/group/list', group.list)
.get('/group/:id', group.info)
.get('/group/:id/member', group.member)
.post('/history/:sender/:recver', history.list)
.post('/history', history.add)

module.exports = router