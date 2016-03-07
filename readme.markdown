# example-websocket-echo

## a minimal websocket echo server for fun and learning.

### quick start

```
npm install

npm start
```

### client code

This creates a websocket connection to server hosted on port 9090.

An event listener is added for incoming data.  When the client recieves data it
will log the data to the console as a string.

Also, here the client writes two messages to the server, which should echo them back.

```js
var websocket = require('websocket-stream')
var ws = websocket('ws://localhost:9090')

ws.on('data', function (data) {
  console.log(data.toString())
})

ws.write('Hello, World!')
ws.write('Echo from websockets!')

```

### server code

Most of this is boilerplate http server stuff.  The real key part is the websocket event listeners.
There is an event listener called connection that fires every time a client connects to the server.
There is also an event listener for messages that the client sends.
When a message is recieved from the client, the server echos the message back with
`ws.send(msg)`.

```js
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

```

### conclusion

Overall I feel this a pretty simple setup to do basic real-time communcation.
If you run the example with `npm start` (after first installing the dependencies
with `npm install`) open your browser and navigate to http://localhost:9090

Then open your console and you should see two messages that your browser initially
sent to the server, and then your server echoed them back to the browser.
