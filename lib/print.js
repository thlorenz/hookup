'use strict'

const util = require('util')

module.exports = function print(obj) {
  process._rawDebug(util.inspect(obj, true, 100, true))
}
