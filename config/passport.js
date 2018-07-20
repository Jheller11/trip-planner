const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User')

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req, email, password, done) => {
        console.log(req.body)
        process.nextTick(() => {
          User.findOne({ 'local.email': email }, (err, user) => {
            if (err) return done(err)
            if (user) {
              return done(
                null,
                false,
                req.flash('signupMessage', 'That email is already taken.')
              )
            } else {
              var newUser = new User()
              newUser.email = email
              newUser.password = newUser.generateHash(password)
              newUser.displayName = req.body.displayName
              newUser.save(err => {
                if (err) throw err
                return done(null, newUser)
              })
            }
          })
        })
      }
    )
  )
  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req, email, password, done) => {
        User.findOne({ 'local.email': email }, (err, user) => {
          if (err) return done(err)
          if (!user)
            return done(
              null,
              false,
              req.flash('loginMessage', 'User not found.')
            )
          if (!user.validPassword(password))
            return done(
              null,
              false,
              req.flash('loginMessage', 'Password is not correct.')
            )
          return done(null, user)
        })
      }
    )
  )
}
