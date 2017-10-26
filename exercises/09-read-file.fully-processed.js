process.on('exit', onexit)

const fs = require('fs')
const print = require('../lib/print')

const { processFileSystem } = require('ah-fs.processor')
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

fs.readFile(__filename, onfileRead)

function onfileRead(err, res) {
  if (err) return print('readError: ' + err.message)
  print({ stage: 'callback', readResult: res.toString() })
}

function onexit() {
  fileSystemActivityCollector
    .disable()
    .cleanAllResources()
    .processStacks()
    .stringifyBuffers()

  // TODO:
  // Instead of printing the fileSystemActivities directly, process them with
  // the processFileSystem function first.
  // https://github.com/nodesource/ah-fs.processor#processfilesystem
  // Then examine the results which will identify the fs.readFile operation with
  // its lower level operations.
  // Compare these to the results you obtained from the partially processed activities
  // in the previous exercise ./08-read-file.partially-processed.js.

  // If you need further help, have a look at
  // http://thlorenz.com/talks/async-hooks/book/async_hooks_high_level_api/async_hooks_high_level_api_13.html
  const activities = fileSystemActivityCollector.fileSystemActivities
  print(activities)
}
