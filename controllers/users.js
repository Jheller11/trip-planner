const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/new', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password
  }).then(user => {
    console.log(user)
  })
})

module.exports = router
