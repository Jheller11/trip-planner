const mongoose = require('../db/connection')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const User = new Schema({})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User)
