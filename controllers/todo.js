const { Todo } = require('../models')

function create (req, res) {
  Todo.create(req.body, (err, createdTodo) => {
    if (err) return res.status(err.errors ? 400 : 500).send(err)

    res.json(createdTodo)
  })
}

function get (req, res) {
  Todo.find(req.query).lean().exec((err, todo) => {
    if (err) return res.status(500).send(err)

    res.json(todo)
  })
}

module.exports = {
  create,
  get
}
