const express = require('express')
const app = express()
const override = require('method-override')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const TripController = require('./controllers/trips')
const UserController = require('./controllers/users')
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(override('_method'))
app.use(cookieParser())

// serve static files
app.use(express.static('public'))

// Passport
app.use(session({ secret: 'liverpool' }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
// Passport

app.set('views', './views')
app.set('view engine', 'pug')

// pass logged in user to all controllers/routes
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.title = 'Site Title'
  next()
})

app.use('/trips', TripController)
app.use('/users', UserController)

app.get('/', (req, res) => {
  res.render('home')
})
app.set('port', process.env.PORT || 4000)

app.listen(app.get('port'), () =>
  console.log('server running on ' + app.get('port'))
)

module.exports = app
