const mongoose = require('../db/connection')

const trip = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const Trip = mongoose.model('Trip', trip)

module.exports = Trip
