const sockjs = require('sockjs')
const { HistoryProxy } = require('./proxy')

function initSocket(server) {
  const conns = {}
  const sockjs_opts = {
    sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"
  };
  const sockjs_echo = sockjs.createServer(sockjs_opts)
  sockjs_echo.on('connection', function(conn) {
    const sessionId = conn.pathname.split('/')[3]
    conns[sessionId] = conns
    conn.on('data', message => {
      conns[sessionId].write(message)
      message.time = Date.now()
      HistoryProxy.add(message)
    })
    conn.on('end', () => {
      delete conns[sessionId]
    })
  })
  sockjs_echo.installHandlers(server, {prefix:'/websocket'})
}

module.exports = initSocket