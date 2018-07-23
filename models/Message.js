const mongoose = require('../db/connection')

const message = new mongoose.Schema({
  text: String,
  user: String,
  trip: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  category: String
})

const Message = mongoose.model('Message', message)
module.exports = Message
