require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const session = require('express-session')
const RDBStore = require('session-rethinkdb')(session)
const rdb = require('rethinkdbdash')({ db: process.env.DB_NAME })
const store = new RDBStore(rdb, { browserSessionsMaxAge: 5000 })

const app = express()
const port = config.port

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({cookie: config.cookie, secret: config.secret, resave: true, saveUninitialized: true, store }))

app.use(require('./router'))

app.listen(port, () =>
	console.log(`👂 Server listening on port ${port}`)
)
