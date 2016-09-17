equire('dotenv').config()
const r = require('rethinkdbdash')()
require('rethinkdb-init')(r)

r.init({
    host: 'localhost',
    port: 28015,
    db: process.env.DB_NAME
  }, [
    'session',
    'users'
  ])
.then(() => {
  console.log ('Done')
  process.exit(0)
})
Contact GitHub API Training Shop Blog About
