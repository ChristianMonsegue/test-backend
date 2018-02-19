const mongoose = require('mongoose')
const _ = require('lodash')
const Schema = mongoose.Schema

const schemaDefinition = {
  details: {
    type: String,
    required: [true, "Details are required."]
  }
}

const todoSchema = new Schema(schemaDefinition)

let Todo = mongoose.model('Todo', todoSchema)

Todo.fields = _.keys(schemaDefinition)

module.exports = Todo
