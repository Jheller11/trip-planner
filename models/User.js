const mongoose = require('../db/connection.js')
const bcrypt = require('bcrypt-nodejs')

const userSchema = new mongoose.Schema({
  username: String,
  password: String
})

userSchema.methods.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = password => {
  return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('User', userSchema)
