const passport = require('../passport')

const home = (req, res) => {
  const user = req.user;
  if (!user) return res.status(400).send('Please login')
  return res.status(201).send(`Yo ${user.username}!`)
}

const login = (req, res, next) => {
  passport.authenticate('local')(req, res, () => res.redirect('/'))
}

module.exports = { home, login }
