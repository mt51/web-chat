const Koa = require('koa')
const jwt = require('koa-jwt')
const body = require('koa-body')
const static = require('koa-static')
const path = require('path')
const sockjs = require('sockjs')
const router = require('./router.config')
const config = require('config')
const secret = config.get('jwt.secret')


const app =  new Koa()


app.use(static(path.resolve(__dirname, 'public')))
app.use(body())

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

app.use(jwt({secret}).unless({path: ['login']}))

app.use(router.routes())
.use(router.allowedMethods())

const server = app.listen(3000)

var sockjs_opts = {
  sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"
};
var sockjs_echo = sockjs.createServer(sockjs_opts);
sockjs_echo.on('connection', function(conn) {
  console.log(conn)
  conn.on('data', function(message) {
        conn.write(message);
    });
});

sockjs_echo.installHandlers(server, {prefix:'/websocket'})
