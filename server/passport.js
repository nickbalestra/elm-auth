const passport = require('passport')
const Strategy = require('passport-twitter').Strategy
var db = require('../db') // TODO: move user storage to rethinkDB

//Twitter strategy for use by Passport.
const twitterAuth = {
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  callbackURL: 'http://127.0.0.1:3000/login/twitter/return'
}

passport.use(new Strategy(twitterAuth,
  (token, tokenSecret, profile, cb) => {
    db.users.findByUsername(profile.username, function(err, user) {
      if (err) return cb(err)
      if (!user) return db.users.createUser(profile, cb)
      return cb(null, user)
    })
  }
))

// Passport authenticated session persistence.
passport.serializeUser((user, cb) => cb(null, user.id));
passport.deserializeUser((id, cb) => {
  db.users.findById(id, (err, user) => {
    if (err) return cb(err)
    cb(null, user)
  })
})

module.exports = passport
