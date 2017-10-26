const asyncHooks = require('async_hooks')
const print = require('../lib/print')

function init(id, type, triggerAsyncId, resource) {
  print({ stage: 'init', id, type, triggerAsyncId })
}

const hook = asyncHooks.createHook({ init })
// We were enabling the hook after the setTimeout was created
hook.enable()
setTimeout(() => {}, 10)
