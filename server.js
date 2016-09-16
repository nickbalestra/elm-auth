const express = require('express')
const app = express()
const { passport } = require('./config')
const { secret, port } = require('./config')
const routes = require('./routes')


// App-level middleware for logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret, resave: true, saveUninitialized: true }));

// Init Passport and restore auth state, if any, from the session.
app.use(passport.initialize())
app.use(passport.session())

// Routes.
// require('./routes')(app)
app.get('/', routes.home)
app.get('/login/twitter', routes.login.twitter)
app.get('/login/twitter/return', routes.login.twiiterCallbackURL)

// Inorite...
app.listen(port, () =>
  console.log('👂 Server listening on port ${port} ')
)