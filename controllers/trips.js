const express = require('express')
const router = express.Router()
const Trip = require('../models/Trip')

router.get('/show', (req, res) => {
  res.render('trips/show')
})

router.get('/new', (req, res) => {
  res.render('trips/new')
})

router.get('/edit', (req, res) => {
  res.render('trips/edit')
})

router.get('/', (req, res) => {
  Trip.find({}).then(trips => {
    res.render('trips/index', { trips: 'trips string' })
  })
})

module.exports = router
