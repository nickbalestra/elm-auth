const r = require('rethinkdbdash')({ db: process.env.DB_NAME })
module.exports = r
