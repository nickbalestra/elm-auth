const express = require('express')
const app = express()
const passport = require('./server/passport')
const { cookie, port, secret } = require('./server/config')
const routes = require('./server/routes')
const session = require('express-session')
const RDBStore = require('session-rethinkdb')(session)

// rethinkDB connection and session store => db: 'elmAuth', table: 'session'
const r = require('rethinkdbdash')({ db: 'elmAuth' })
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
app.listen(port, () =>
  console.log(`👂 Server listening on port ${port}`)
)
