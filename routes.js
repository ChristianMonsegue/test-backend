const express = require('express')
const { query, validationResult } = require('express-validator/check')

const { TodoController } = require('./controllers')

const router = express.Router()

router.get('/api/test', (req, res) => res.json("Server is active."))

router.get('/api/todo/:id', TodoController.get)

function checkValidation (req, res, next) {
  try {
    validationResult(req).throw();

    next();
  } catch (err) {
    return res.status(400).send(err)
  }
}

module.exports = router
