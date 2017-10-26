const asyncHooks = require('async_hooks')
const print = require('../lib/print')
const fs = require('fs')

//
// NOTHING TO SOLVE HERE, JUST FOLLOW THE INSTRUCTIONS
//

// TODO: this example shows how things can get very complex very quickly

// Just run it and inspect the result and try to identify each operation
// involved when reading a file (there should be 4).
// In the next example we'll use some libraries that make reasoning about
// the data much easier.

// Also note that not all the resources have been destroyed by the time the
// process exits. That is totally normal and they would get destroyed if the
// process would keep running.

function captureStack() {
  var stack = {}
  Error.captureStackTrace(stack, captureStack)
  return stack.stack.split('\n').slice(1)
}

function init(id, type, triggerAsyncId, resource) {
  const stack = captureStack()
  print({ stage: 'init', id, type, triggerAsyncId, stack })
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

const hook = asyncHooks.createHook({ init, before, after, destroy })
hook.enable()

fs.readFile(__filename, onfileRead)
function onfileRead(err, res) {
  if (err) return print('readError: ' + err.message)
  print({ stage: 'callback', readResult: res.toString() })
}
