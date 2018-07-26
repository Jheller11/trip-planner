const express = require('express')
const router = express.Router()
const Trip = require('../models/Trip')
const bcrypt = require('bcrypt-nodejs')

// show a single trip
router.get('/show/:id', (req, res) => {
  Trip.findOne({ _id: req.params.id }).then(trip => {
    res.render('trips/show', { trip: trip })
  })
})

// show the form for creating a new trip (must be logged in)
router.get('/new', isLoggedIn, (req, res) => {
  res.render('trips/new')
})

// handles a user search for specific trip + redirect directly to trip
// if error (no matching trip) then redirect back to index with alert message
router.post('/search', (req, res) => {
  Trip.findOne({ _id: req.body.input })
    .then(trip => {
      if (trip) {
        res.redirect(`/trips/show/${trip.id}`)
      }
    })
    .catch(err => {
      Trip.find({}).then(trips => {
        res.render('trips/index', {
          trips: trips,
          searchMessage:
            'Sorry, no matching trip found.  Please double check ID number and try again.'
        })
      })
    })
})

// save a new trip to db/redirect to that trip page
router.post('/new', (req, res) => {
  Trip.create({
    name: req.body.name,
    location: { city: req.body.city },
    admin: { userid: req.user.id, displayName: req.user.local.displayName },
    attending: [
      { userid: req.user.id, displayName: req.user.local.displayName }
    ],
    passcode: bcrypt.hashSync(req.body.passcode)
  }).then(trip => {
    res.redirect(`/trips/show/${trip.id}`)
  })
})

// add a message
router.post('/:id', isLoggedIn, (req, res) => {
  Trip.findOne({ _id: req.params.id }).then(trip => {
    trip.messages.push({
      message: req.body.message,
      category: req.body.category,
      user: { userid: req.user.id, displayName: req.user.local.displayName }
    })
    trip.save()
    res.redirect('/trips/show/' + trip.id)
  })
})

// edit trip
router.put('/edit/:id', (req, res) => {
  Trip.findOneAndUpdate({ _id: req.params.id }, req.body).then(trip => {
    res.redirect(`/trips/show/${trip.id}`)
  })
})

// sign a user up attending a trip (requires login)
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

// route for controlling access to edit page (user must be marked as admin)
router.get('/edit/:id', (req, res) => {
  Trip.findOne({ _id: req.params.id }).then(trip => {
    if (isAdminUser(req, trip)) {
      res.render('trips/edit', { trip: trip })
    } else {
      res.render('trips/show', {
        trip: trip,
        message: 'You must have admin rights to edit the trip.'
      })
    }
  })
})

// route for deleting a trip
router.delete('/:id', (req, res) => {
  Trip.findOneAndRemove({ _id: req.params.id }).then(() => {
    res.redirect('/trips')
  })
})

// get all trips for index page
router.get('/', (req, res) => {
  Trip.find({}).then(trips => {
    res.render('trips/index', { trips: trips })
  })
})

// verify current user exists
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/trips')
}

// verify user is admin for making changes
function isAdminUser(req, trip) {
  if (req.isAuthenticated() && req.user.id === trip.admin.userid) return true
  else return false
}

module.exports = router
