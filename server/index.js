require('dotenv').config()

const express = require('express')
const passport = require('./passport')
const { cookie, port, secret } = require('./config')
const routes = require('./routes')
const session = require('express-session')
const RDBStore = require('session-rethinkdb')(session)

const app = module.exports = express()

// rethinkDB connection and session store => db: 'elmAuth', table: 'session'
const r = require('rethinkdbdash')({ db: process.env.DB_NAME })
const store = new RDBStore(r,  { browserSessionsMaxAge: 5000 })

// App-level middlewares for logging, parsing, and session handling.
app.use(require('morgan')('combined'))
app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(session({cookie, secret, resave: true, saveUninitialized: true, store }))
app.use(passport.initialize())
app.use(passport.session())

// Routes.
app.get('/', routes.home)
app.get('/login/twitter', routes.login.twitter)
app.get('/login/twitter/return', routes.login.twiiterCallbackURL)

// Inorite...
if (!module.parent) {
  app.listen(port, () =>
    console.log(`⚡  Express started on port ${port}`)
  )
}