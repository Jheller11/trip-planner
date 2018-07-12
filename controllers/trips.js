const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('trip controller')
})

module.exports = router
