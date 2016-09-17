const passport = require('passport')
const Strategy = require('passport-local').Strategy
const users = require('../db/users')

passport.use(new Strategy(
  (username, password, cb) => {
    users.findByUsername(username, (err, user) => {
      if (err) return cb(err)
      if (!user) return users.createUser({ username, password }, cb)
      if (user.password != password) return cb(null, false)
      return cb(null, user)
    })
  }
))

// Passport authenticated session persistence.
passport.serializeUser((user, cb) => cb(null, user.id));
passport.deserializeUser((id, cb) => {
  users.findById(id, (err, user) => {
    if (err) return cb(err)
    cb(null, user)
  })
})

module.exports = passport
