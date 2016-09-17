const passport = require('../passport')


const home = (req, res) => {
  const user = req.user;
  if (!user) return res.status(400).send('Please login')
  if (!user.granted) return res.status(400).send(`Not yet ${user.name}, not yet...`)
  else return res.status(201).send(`Yo ${user.name}!`)
}

const login = {
  twitter: passport.authenticate('twitter'),
  twiiterCallbackURL(req, res, next) {
    passport.authenticate('twitter')(req, res, () => res.redirect('/'))
  }
}

module.exports = { home, login }
