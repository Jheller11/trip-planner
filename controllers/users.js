const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')
require('../config/passport')(passport)

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.get('/profile', (req, res) => {
  res.render('profile')
})

router.post(
  '/signup',
  passport.authenticate('local-signup', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/signup',
    failureFlash: true
  })
)

module.exports = router
