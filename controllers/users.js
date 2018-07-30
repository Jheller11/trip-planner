const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')
require('../config/passport')(passport)
const Trip = require('../models/Trip')

router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('loginMessage') })
})

router.get('/signup', (req, res) => {
  res.render('signup', { message: req.flash('signupMessage') })
})

// show user profile with "my trips" list of registered attending trips
router.get('/profile', isLoggedIn, (req, res) => {
  let myTrips = []
  Trip.find({})
    .then(trips => {
      trips.forEach(trip => {
        trip.attending.forEach(attendee => {
          if (attendee.userid === req.user.id) {
            myTrips.push(trip)
          }
        })
      })
    })
    .then(() => {
      res.render('profile', { myTrips: myTrips })
    })
})

router.post(
  '/login',
  passport.authenticate('local-login', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/login',
    failureFlash: true
  })
)

router.post(
  '/signup',
  passport.authenticate('local-signup', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/signup',
    failureFlash: true
  })
)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}

module.exports = router
