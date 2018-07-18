const express = require('express')
const router = express.Router()
const Trip = require('../models/Trip')

router.get('/show/:id', (req, res) => {
  Trip.findOne({ _id: req.params.id }).then(trip => {
    res.render('trips/show', { trip: trip })
  })
})

router.get('/new', (req, res) => {
  res.render('trips/new')
})

router.get('/edit/:id', (req, res) => {
  res.render('trips/edit')
})

router.get('/', (req, res) => {
  Trip.find({}).then(trips => {
    res.render('trips/index', { trips: trips })
  })
})

module.exports = router
