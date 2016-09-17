require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')

const app = express()
const port = config.port

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(require('./router'))

app.listen(port, () =>
	console.log(`👂 Server listening on port ${port}`)
)
