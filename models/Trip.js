const mongoose = require('../db/connection')

const message = new mongoose.Schema({
  message: String,
  category: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  user: {
    userid: String,
    displayName: String
  }
})

const trip = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
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
  messages: [message]
})

const Trip = mongoose.model('Trip', trip)

module.exports = Trip
