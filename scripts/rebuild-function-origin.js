const fs = require('fs')
const path = require('path')

// Depending on which npm we are using function-origin was pulled up or is still
// a direct dep of ah-fs
var dir
try {
  dir = path.join(__dirname, '..', 'node_modules', 'function-origin')
  fs.accessSync(dir)
} catch (e) {
  dir = path.join(path.dirname(require.resolve('ah-fs')), 'node_modules', 'function-origin')
  try {
    fs.accessSync(dir)
  } catch (e) {
    console.error('Was unable to find the installed function-origin :(')
    console.error('Please rebuild manually or if you installed using node 8 you may be fine')
    console.error(e)
  }
}

const { spawn } = require('child_process')

spawn('node-gyp', [ 'rebuild' ], { cwd: dir, stdio: 'inherit' }, onrebuilt)

function onrebuilt(err) {
  if (err) return console.error(err)
}
