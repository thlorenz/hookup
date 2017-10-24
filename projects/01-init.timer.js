const util = require('util')
const asyncHooks = require('async_hooks')

// NOTE:
// We are using our custom print method since we cannot use console.log due to
// it initializing new asynchronous resources.
// In the following projects we will use the `./lib/print` module for the same purpose.
function print(obj) {
  process._rawDebug(util.inspect(obj, true, 100, true))
}

function init(id, type, triggerAsyncId, resource) {
  print({ id, type, triggerAsyncId, resource })
}

const hook = asyncHooks.createHook({ init })

// TODO:
// Running this code doesn't print anything because we forgot to enable the hook.

setTimeout(() => {}, 10)
