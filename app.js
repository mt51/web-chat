const Koa = require('koa')
const Router = require('koa-router')
const body = require('koa-body')
const static = require('koa-static')
const path = require('path')
const fs = require('fs')
const sockjs = require('sockjs')
const router = require('./router.config')


const app =  new Koa()


app.use(static(path.resolve(__dirname, 'public')))
app.use(body())

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
