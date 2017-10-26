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
  fileSystemActivityCollector
    .disable()
    .cleanAllResources()
    .processStacks()

  print(fileSystemActivityCollector.fileSystemActivities)
}
