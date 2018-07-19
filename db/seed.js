const Trip = require('../models/Trip.js')
const mongoose = require('./connection.js')
const seeds = require('./seeds.json')
mongoose.Promise = Promise

//seed db
Trip.remove({}).then(() => {
  Trip.insertMany(seeds).then(() => {
    mongoose.connection.close()
  })
})
