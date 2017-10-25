const asyncHooks = require('async_hooks')
const print = require('../lib/print')

function init(id, type, triggerAsyncId, resource) {
  print({ id, type, triggerAsyncId })
}

function before(id) {
  print({ stage: 'before', id })
}

function after(id) {
  print({ stage: 'after', id })
}

// TODO: we only see the `init` event being fired. Make sure we also see `before` and `after`.
const hook = asyncHooks.createHook({ init })
hook.enable()
setTimeout(ontimeout, 10)

function ontimeout() {
  print('User callback fired')
}
