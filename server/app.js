require('dotenv').config()

const express = require('express')
const passport = require('./passport')
const { cookie, port, secret } = require('./config')
const routes = require('./routes')
const session = require('express-session')
const RDBStore = require('session-rethinkdb')(session)
const db = require('./db')
const app = module.exports = express()
const path = require('path');


// Store session in RethinkDB (table: session)
const store = new RDBStore(db, { browserSessionsMaxAge: 5000 })

// App-level middlewares for logging, parsing, and session handling.
const publicPath = path.join(__dirname, '/../dist');
app.use(express.static(publicPath));
app.use(require('morgan')('combined'))
app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(session({cookie, secret, resave: true, saveUninitialized: true, store }))
app.use(passport.initialize())
app.use(passport.session())


// Routes.
app.get('/home', routes.home)
app.post('/login', routes.login)
app.get('*', (req, res) =>
  res.sendFile(path.resolve(publicPath, 'index.html'))
  )

// Start express.
if (!module.parent) {
  app.listen(port, err => {
    if (err) console.log(err)
    console.log(`⚡  Express started on port ${port}`)
  })
}
