const express = require('express')
const jwt = require('jsonwebtoken')
const _ = require('lodash/fp')
const config = require('../config')

let users = [{
  id: 1,
  username: 'John',
  password: 'Doe'
}]

const createToken = user =>
  jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*5 })

const app = express.Router()

app.post('/signup', (req, res) => {
  const username = req.body.username

  if (!username || !req.body.password)
    return res.status(400).send('You must send the username and password')

  if (_.find({ username }, users))
   return res.status(400).send('A user with the same username already exists')

  const newUser = {
    username,
    password: req.body.password,
    id: _.max(users, 'id').id + 1
  }

  users = users.concat(newUser)

  res.status(201).send({
    id_token: createToken(newUser)
  })
})

app.post('/signin', (req, res) => {
  const username = req.body.username
    console.log('username e psw: ', username, req.body.password)
    console.log('/signin - users: ', users)

  if (!username || !req.body.password)
    return res.status(400).send('You must send the username and password')

  const user = _.find({ username }, users)

  if (!user || user.password !== req.body.password)
    return res.status(400).send('The username or password don\'t match')

  res.status(201).send({
    id_token: createToken(user)
  })
})

module.exports = app