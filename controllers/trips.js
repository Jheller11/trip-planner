const express = require('express')
const router = express.Router()
const Trip = require('../models/Trip')

router.get('/show/:id', (req, res) => {
  Trip.findOne({ _id: req.params.id }).then(trip => {
    res.render('trips/show', { trip: trip })
  })
})

router.get('/new', isLoggedIn, (req, res) => {
  res.render('trips/new')
})

router.post('/new', (req, res) => {
  Trip.create({
    name: req.body.name,
    location: { city: req.body.city },
    admin: { userid: req.user.id, displayName: req.user.local.displayName },
    attending: [
      { userid: req.user.id, displayName: req.user.local.displayName }
    ]
  }).then(trip => {
    res.redirect(`/trips/show/${trip.id}`)
  })
})

router.put('/edit/:id', (req, res) => {
  Trip.findOneAndUpdate({ _id: req.params.id }, req.body).then(trip => {
    res.redirect(`/trips/show/${trip.id}`)
  })
})

router.put('/:id', isLoggedIn, (req, res) => {
  Trip.findOne({ _id: req.params.id }).then(trip => {
    let match = trip.attending.find(person => {
      return person.userid === req.user.id
    })
    if (!match) {
      trip.attending.push({
        userid: req.user.id,
        displayName: req.user.local.displayName
      })
      trip.save()
    }
    res.redirect(`/trips/show/${trip.id}`)
  })
})

router.get('/edit/:id', (req, res) => {
  Trip.findOne({ _id: req.params.id }).then(trip => {
    res.render('trips/edit', { trip: trip })
  })
})

router.delete('/:id', (req, res) => {
  Trip.findOneAndRemove({ _id: req.params.id }).then(() => {
    res.redirect('/trips')
  })
})

router.get('/', (req, res) => {
  Trip.find({}).then(trips => {
    res.render('trips/index', { trips: trips })
  })
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/trips')
}

function isAdminUser(req, res, next) {
  if (req.isAuthenticated() && req.user.id === admin.userid) return next()
  req.flash('message')
}

module.exports = router
