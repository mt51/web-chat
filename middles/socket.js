
const sockjs = require('sockjs')
const server = require('../app')
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

module.exports = () => {
  sockjs_echo.installHandlers(server, {prefix:'/websocket'})
}
