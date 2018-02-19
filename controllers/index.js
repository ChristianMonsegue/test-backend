const _ = require("lodash")
const path = require("path")

_.merge(exports, require('../utility').createModules(path.join(__dirname), 'Controller'))
