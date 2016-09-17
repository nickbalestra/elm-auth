const db = require('./')
module.exports = { findById, findByUsername, createUser }

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

function createUser(profile, cb){
  process.nextTick(() => {
    const newUser = {
      username: profile.username,
      name: profile.displayName,
      granted: false,
    }

    db.table('users')
      .insert(newUser)
      .run()
      .then((dbResponse) => {
        cb(null, Object.assign(newUser, {id: dbResponse.generated_keys[0]}))
      })
  })
}
