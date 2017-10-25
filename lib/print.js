'use strict'

const path = require('path')
const fs = require('fs')
const util = require('util')
const stringify = require('json-stringify-safe')
const jsonFile = path.join(__dirname, '..', 'result.json')
const htmlFile = path.join(__dirname, '..', 'result.html')

const writeJSON = (
  process.argv.slice(2).indexOf('--json') >= 0 ||
  process.env.HOOKUP_JSON != null
)

const writeHTML = (
  process.argv.slice(2).indexOf('--html') >= 0 ||
  process.env.HOOKUP_HTML != null
)

const activities = []

function print(obj) {
  process._rawDebug(util.inspect(obj, true, 100, true))
}

function collect(obj) {
  activities.push(obj)
}

if (writeHTML) {
  process.on('exit', dumpHTML)
} else if (writeJSON) {
  process.on('exit', dumpJSON)
}

function dumpJSON(obj) {
  fs.writeFileSync(jsonFile, stringify(activities, null, 2), 'utf8')
  console.log('saved to ' + jsonFile)
}

function dumpHTML() {
  const json = stringify(activities)
  const indexHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>hookup result</title>
    <script type="text/javascript" charset="utf-8">
      ${fs.readFileSync(path.join(__dirname, '..', 'deps', 'pretty-print.js'), 'utf8')}
    </script>
  </head>
  <body>
  </body>
  <script type="text/javascript" charset="utf-8">
    var json = '${json.replace(/'/g, "\\'").replace(/\\n/g, ' ')}'
    var activities = JSON.parse(json)
    for (var i = 0; i < activities.length; i++) {
      var tbl = prettyPrint(activities[i], { expanded: true, maxDepth: 999 })
      document.body.appendChild(tbl)
    }
  </script>
</html>
`

  fs.writeFileSync(htmlFile, indexHtml, 'utf8')
  console.log('saved to ' + htmlFile)
}

module.exports = (
    writeHTML ? collect
  : writeJSON ? collect
  : print
)
