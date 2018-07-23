const mongoose = require('../db/connection')

const trip = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  admin: {
    userid: String,
    displayName: String
  },
  location: {
    type: Object,
    default: {
      city: '',
      latLng: ''
    }
  },
  attending: {
    type: Array,
    default: []
  },
  accomadation: {
    type: Object,
    default: {
      url: '',
      price: 0
    }
  },
  messages: {
    type: Array,
    default: [
      'Welcome to your new trip!  Use this space to communicate with others'
    ]
  }
})

const Trip = mongoose.model('Trip', trip)

module.exports = Trip
