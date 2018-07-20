const app = require('express')()
const override = require('method-override')
const parser = require('body-parser')
const TripController = require('./controllers/trips')
const UserController = require('./controllers/users')
const passport = require('passport')
const local = require('passport-local')

// Passport

// Passport

app.use(parser.urlencoded({ extended: true }))
app.use(override('_method'))

app.set('views', './views')
app.set('view engine', 'pug')

app.use('/trips', TripController)
app.use('/users', UserController)

app.get('/', (req, res) => {
  res.render('home', { title: 'Trip Planner' })
})
app.set('port', process.env.PORT || 4000)

app.listen(app.get('port'), () => console.log('server running'))
