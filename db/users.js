const db = require('./')

function findById(id, cb) {
  process.nextTick(() => {
    db.table('users')
    .get(id)
    .run()
    .then( user => {
      cb(null, user)
    })
    .error(() => {
      cb(new Error('User ' + id + ' does not exist'))
    })
  })
}

function findByUsername(username, cb) {
  process.nextTick(() => {
    db.table('users')
      .filter({ username })
      .run()
      .then(results => {
        if (results.length > 0) return cb(null, results[0])
        return cb(null, null)
      })
  })
}

function insert(user, cb){
  process.nextTick(() => {
    db.table('users')
      .insert(user)
      .run()
      .then((dbResponse) => {
        cb(null, Object.assign(user, {id: dbResponse.generated_keys[0]}))
      })
  })
}

module.exports = { findById, findByUsername, insert }
