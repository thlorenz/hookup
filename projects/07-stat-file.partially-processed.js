// Note: we need to subscribe to process exit BEFORE
// the print module does in order to process and report
// our results before they are dumped by that module.

process.on('exit', onexit)

const fs = require('fs')
const print = require('../lib/print')

const FileSystemActivityCollector = require('ah-fs')

const BUFFERLENGTH = 50
const STRINGLENGTH = 10
const opts = {
    start            : process.hrtime()
  , captureArguments : true
  , captureSource    : false
  , bufferLength     : BUFFERLENGTH
  , stringLength     : STRINGLENGTH
}
const fileSystemActivityCollector = new FileSystemActivityCollector(opts)
fileSystemActivityCollector.enable()

fs.stat(__filename, onfileStated)
function onfileStated(err, res) {
  if (err) return print('statError: ' + err.message)
  print({ stage: 'callback', statResult: res })
}

function onexit() {
  // TODO:
  // Disable the fileSystemActivityCollector, clean all resources and process stacks before printing the result.
  // Try to use the ah-collector documentation (https://github.com/nodesource/ah-collector#ah-collector)
  // as well as the ah-fs documentation (https://github.com/nodesource/ah-fs#api)

  // In case you get totally stuck have a look here ;)
  // http://thlorenz.com/talks/async-hooks/book/async_hooks_high_level_api/async_hooks_high_level_api_11.html

  print(fileSystemActivityCollector.fileSystemActivities)
}
