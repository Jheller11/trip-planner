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
  }
})

const Trip = mongoose.model('Trip', trip)

module.exports = Trip
