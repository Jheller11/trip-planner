const app = require('express')()
const override = require('method-override')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const TripController = require('./controllers/trips')
const UserController = require('./controllers/users')
const passport = require('passport')
const local = require('passport-local')
const flash = require('connect-flash')
const session = require('express-session')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(override('_method'))
app.use(cookieParser())

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
  next()
})

app.use('/trips', TripController)
app.use('/users', UserController)

app.get('/', (req, res) => {
  res.render('home', { title: 'Trip Planner' })
})
app.set('port', process.env.PORT || 4000)

app.listen(app.get('port'), () => console.log('server running'))
