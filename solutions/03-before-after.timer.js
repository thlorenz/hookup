const asyncHooks = require('async_hooks')
const print = require('../lib/print')

function init(id, type, triggerAsyncId, resource) {
  print({ stage: 'init', id, type, triggerAsyncId })
}

function before(id) {
  print({ stage: 'before', id })
}

function after(id) {
  print({ stage: 'after', id })
}

const hook = asyncHooks.createHook({ init, before, after })
hook.enable()
setTimeout(ontimeout, 10)

function ontimeout() {
  print('User callback fired')
}
