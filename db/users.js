const _ = require('lodash/fp')

let records = [
  { id: 1, username: 'nickbalestra', name: 'Nick Balestra', granted: true }
]

exports.findById = (id, cb) => {
  process.nextTick(() => {
    const record = _.find({ id }, records)
    if (record) cb(null, record)
    else cb(new Error('User ' + id + ' does not exist'))
  })
}

exports.findByUsername = (username, cb) => {
  process.nextTick(() => {
    const record = _.find({ username }, records)
    if (record) return cb(null, record)
    return cb(null, null)
  });
}

exports.createUser = (profile, cb) => {
  process.nextTick(() => {
    const newUser = {
      username: profile.username,
      name: profile.displayName,
      granted: false,
      id: _.max(records, 'id').id + 1
    }
    records = records.concat(newUser)
    return cb(null, newUser)
  })
}