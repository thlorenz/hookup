const asyncHooks = require('async_hooks')
const print = require('../lib/print')
const fs = require('fs')

function captureStack() {
  var stack = {}
  Error.captureStackTrace(stack, captureStack)
  return stack.stack.split('\n').slice(1)
}

function init(id, type, triggerAsyncId, resource) {
  // TODO: here we're capturing the callstack during `init`.
  // Examine the stacktrace and try to find the origin of the `fs.stat` call in our code.
  // Do the same for the other lifetime events and compare your results.
  const stack = captureStack()
  print({ stage: 'init', id, type, triggerAsyncId, stack })
}

function before(id) {
  // TODO: uncomment the below debugger statement and run your code with the
  // `--inspect-brk` flag, or via the `npm run inspect` script.
  // Then open a Node.js dedicated DevTools (see the Readme for more info).
  //
  // Make sure you DON'T have 'Disable async stack traces' checked in the Debugger section of
  // the DevTools settings.
  //
  // Inspect the callstack on the right side of DevTools once you break here.
  // What can you find out about how Chrome DevTools provides async stacktraces for Node.js?

  // debugger

  const stack = captureStack()
  print({ stage: 'before', id, stack })
}

function after(id) {
  const stack = captureStack()
  print({ stage: 'after', id, stack })
}

function destroy(id) {
  const stack = captureStack()
  print({ stage: 'destroy', id, stack })
}

const hook = asyncHooks.createHook({ init, before, after, destroy })
hook.enable()

fs.stat(__filename, onfileStated)
function onfileStated(err, res) {
  if (err) return print('statError: ' + err.message)
  print({ stage: 'callback', statResult: res })
}
