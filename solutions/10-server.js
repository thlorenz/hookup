process.on('exit', onexit)
const http = require('http')
const PORT = 3333

const print = require('../lib/print')

var server

//
// Async Hooks Functionality
//

const NetworkActivityCollector = require('ah-net')
const { processNetwork } = require('ah-net.processor')
const includeActivities = false
var collector

function enableAsyncHooks() {
  const BUFFERLENGTH = 18
  const STRINGLENGTH = 10
  collector = new NetworkActivityCollector({
      start            : process.hrtime()
    , captureArguments : true
    , captureSource    : false
    , bufferLength     : BUFFERLENGTH
    , stringLength     : STRINGLENGTH
  }).enable()
}

function onexit() {
  collector
    .disable()
    .cleanAllResources()
    .processStacks()

  const processedNetworkActivities = processNetwork({ activities: collector.networkActivities, includeActivities })
  print(processedNetworkActivities)
}

//
// Server functionality
//
function serveWorld(res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.write('world')
  res.end()
}

function serveShutdown(res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.write('shutting down')
  res.end()
  server.close(onclosed)
}

function onrequest(req, res) {
  if (req.url === '/hello') return serveWorld(res)
  if (req.url === '/shutdown') return serveShutdown(res)

  res.writeHead(404)
  res.end()
}

function onerror(err) {
  console.error(err)
}

function onlistening() {
  const addr = server.address()
  console.error('Listening on http://localhost:' + addr.port)
}

function onclosed() {
  console.error('server closed')
}

function startServer() {
  server = http.createServer()
  server
    .on('request', onrequest)
    .on('error', onerror)
    .on('listening', onlistening)
    .listen(PORT)
}

//
// Starting things up
//
enableAsyncHooks()
startServer()
