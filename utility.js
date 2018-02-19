const _ = require('lodash')
const fs = require("fs")
const path = require("path")
const mongoose = require('mongoose')
const Schema = mongoose.Schema

function createModules (filePath=path.join(__dirname), suffix) {
  const providedSuffix = _.isString(suffix) ? suffix : ''
  return _.transform(fs.readdirSync(filePath), (result, file) => {
    if (file !== 'index.js') {
      let moduleName = _.capitalize(_.camelCase(file.replace(/\.[^/.]+$/, "")))
      result[`${moduleName}${providedSuffix}`] = require(`${filePath}/${file}`)
    }
  }, {})
}

module.exports = {
  createModules
}
