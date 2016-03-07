var websocket = require('websocket-stream')
var ws = websocket('ws://localhost:9090')

ws.on('data', function (data) {
  console.log(data.toString())
})

ws.write('Hello, World!')
ws.write('Echo from websockets!')
