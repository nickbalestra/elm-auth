const _ = require('lodash/fp')

let users = [
  { id: 1, username: 'John', password: 'Doe'}
]

function findByUsername(username) {
  return _.find({ username }, users)
}

function insert(user) {
  const newUser = {
    username: user.username,
    password: user.password,
    id: _.max(users, 'id').id + 1
  }

  users = users.concat(newUser)
  return _.last(users)
}

module.exports = { findByUsername, insert }
