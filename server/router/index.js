const express = require('express')
const jwt = require('jsonwebtoken')
const _ = require('lodash/fp')
const config = require('../config')
const users = require('../../db/users')

const createToken = user =>
  jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*5 })

const app = express.Router()

app.post('/signup', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  if (!username || !password)
    return res.status(400).send('You must send the username and password')

  if (users.findByUsername(username))
   return res.status(400).send('A user with the same username already exists')

  const newUser = users.insert({username, password})

  res.status(201).send({
    id_token: createToken(newUser)
  })
})

app.post('/signin', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  if (!username || !password)
    return res.status(400).send('You must send the username and password')

  user = users.findByUsername(username)

  if (!user || user.password !== password)
    return res.status(400).send('The username or password don\'t match')

  res.status(201).send({
    id_token: createToken(user)
  })
})

module.exports = app
