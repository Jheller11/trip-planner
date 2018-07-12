const express = require('express')
const router = express.Router()
const Trip = require('../models/Trip')

router.get('/', (req, res) => {
  res.send('trip controller')
})

module.exports = router
