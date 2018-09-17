const Koa = require('koa')
const jwt = require('koa-jwt')
const body = require('koa-body')
const static = require('koa-static')
const path = require('path')
const router = require('./router.config')
const config = require('config')
const secret = config.get('jwt.secret')
const initSocket = require('./socket')
const cors = require('koa2-cors')


const app =  new Koa()


app.use(static(path.resolve(__dirname, 'public')))
app.use(body())

app.use(cors())

app.use((ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        code: -1,
        msg: '请先登录'
      }
    } else {
      throw err
    }
  })
})

app.use(jwt({secret}).unless({path: ['/login']}))

app.use(router.routes())
.use(router.allowedMethods())

const server = app.listen(3000)

initSocket(server)