const asyncHooks = require('async_hooks')
const print = require('../lib/print')

function init(id, type, triggerAsyncId, resource) {
  print({ stage: 'init', id, type, triggerAsyncId })
}

const hook = asyncHooks.createHook({ init })
setTimeout(() => {}, 10)

// TODO:
// Here we don't see anything printed. Do you know why?
hook.enable()
