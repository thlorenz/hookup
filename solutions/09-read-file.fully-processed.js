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

  const activities = fileSystemActivityCollector.fileSystemActivities
  const processedActivities = processFileSystem({ activities })
  print(processedActivities)
}
