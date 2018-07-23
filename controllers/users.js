const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')
require('../config/passport')(passport)

router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('loginMessage') })
})

router.get('/signup', (req, res) => {
  res.render('signup', { message: req.flash('signupMessage') })
})

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { user: req.user })
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
