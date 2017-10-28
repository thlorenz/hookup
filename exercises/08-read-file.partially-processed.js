process.on('exit', onexit)

const fs = require('fs')
const print = require('../lib/print')

const FileSystemActivityCollector = require('ah-fs')

// TODO: Second Step (please complete the First Step below first)
// Play with the BUFFERLENGTH and see how it affects the output.
//
// Finally think about if it would always be a good idea to include buffers here
// when considering security.
// Try to disable the inclusion of Buffers entirely via the API.
// https://github.com/nodesource/ah-fs#filesystemactivitycollector
const BUFFERLENGTH = 500
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
  // TODO: First Step
  // The filestemActivityCollector has a function that allows stringifying the included Buffers
  // https://github.com/nodesource/ah-fs#filesystemactivitycollectorstringifybuffers
  // Please use that feature in order to improve the Buffer output, then return to the second step.
  fileSystemActivityCollector
    .disable()
    .cleanAllResources()
    .processStacks()

  print(fileSystemActivityCollector.fileSystemActivities)
}
