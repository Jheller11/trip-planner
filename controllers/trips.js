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

router.post('/new', (req, res) => {
  Trip.create({
    name: req.body.name
  }).then(trip => {
    res.redirect(`/trips/show/${trip.id}`)
  })
})

router.get('/edit/:id', (req, res) => {
  Trip.findOne({ _id: req.params.id }).then(trip => {
    res.render('trips/edit', { trip: trip })
  })
})

router.patch('/edit/:id', (req, res) => {
  Trip.findOneAndUpdate({ _id: req.params.id }, req.body).then(trip => {
    res.redirect(`trips/show/${trip.id}`, { trip: trip })
  })
})

router.delete('/:id', (req, res) => {
  Trip.findOneAndRemove({ _id: req.params.id }).then(() => {
    res.redirect('/')
  })
})

router.get('/', (req, res) => {
  Trip.find({}).then(trips => {
    res.render('trips/index', { trips: trips })
  })
})

module.exports = router
