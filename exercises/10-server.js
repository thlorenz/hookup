process.on('exit', onexit)
const http = require('http')
const PORT = 3333

const asyncHooks = require('async_hooks')
const print = require('../lib/print')

// NOTE:
//
// After you start the server do the following in a terminal or enter the URLS into your browser.
// curl localhost:3333/hello
// curl localhost:3333/shutdown

var server

//
// Async Hooks Functionality
//
// TODO: here we're using the async hooks API directly.
// After running the example and getting an idea how much information
// you will get (too much) use the following module to only collect
// network activities only (similarly to how we did in the previous exercise
// for the file system).
// https://github.com/nodesource/ah-net#api
//
// HINT1: the API is very similar to ah-fs
// HINT2: don't do any processing here, just initialize and enable it
function init(id, type, triggerAsyncId, resource) {
  print({ stage: 'init', id, type, triggerAsyncId })
}

function before(id) {
  print({ stage: 'before', id })
}

function after(id) {
  print({ stage: 'after', id })
}

function destroy(id) {
  print({ stage: 'destroy', id })
}

function enableAsyncHooks() {
  const hook = asyncHooks.createHook({ init, before, after, destroy })
  hook.enable()
}

function onexit() {
  // TODO: when the process exits we need to process the activities
  // collected by ah-net with help of ah-net.processor.
  // https://github.com/nodesource/ah-net.processor#processnetwork

  // If you need further help please consult this slide:
  // http://thlorenz.com/talks/async-hooks/book/async_hooks_high_level_api/async_hooks_high_level_api_12.html
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

function onclosed() { }

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
