const Koa = require('koa')
const session = require('koa-session')
const Router = require('koa-router')
const body = require('koa-body')
const static = require('koa-static')
const path = require('path')
const fs = require('fs')
const sockjs = require('sockjs')
const router = new Router()


const app =  new Koa()

app.keys = ['test session']

const CONFIG = {
  key: 'koa:sess',
  maxAge: 10000,
  httpOnly: true,
  signed: true,
  rolling: true,
  renew: false
}


app.use(static(path.resolve(__dirname, 'public')))
app.use(session(CONFIG, app))
app.use(body())

router.post('/login', async ctx => {
  const { account } = ctx.request.body
  if (!account) {
    ctx.response.status = 400
  } else {
    ctx.session.userinfo = account
    ctx.redirect('/')
  }
})

router.get('/login', ctx => {
  ctx.response.type = 'html'
  ctx.response.body = fs.readFileSync(path.resolve(__dirname, './public/login.html'))
})

router.get('/', ctx => {
  const userinfo = ctx.session.userinfo
  if (!userinfo) {
    ctx.response.redirect('/login')
  } else {
    ctx.response.type = 'html'
    ctx.response.body = fs.readFileSync(path.resolve(__dirname, './public/home.html'))
  }
})

router.get('/test', ctx => {
  ctx.response.body = 'server is running at http://localhost:3000'
})

router.get('/logout', ctx => {
  ctx.session = null
  ctx.redirect('/login')
})

app.use(router.routes())

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

sockjs_echo.installHandlers(server, {prefix:'/echo'})
