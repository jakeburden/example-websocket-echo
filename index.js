var http = require('http')
var fs = require('fs')

var websocket = require('websocket-stream')

var server = http.createServer(function (req, res) {
  if (req.url === '/') {
    fs.createReadStream('browser/index.html')
      .pipe(res)
  } else if (req.url === '/bundle.js') {
    fs.createReadStream('browser/bundle.js')
      .pipe(res)
  } else res.end('404')
})

var wss = websocket.createServer({server: server})

wss.on('connection', function (ws) {
  ws.on('message', function (msg) {
    ws.send(msg)
  })
})

server.listen(9090, function () {
  console.log('server is running on http://localhost:9090')
})
