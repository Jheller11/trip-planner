const app = require('express')()
const override = require('method-override')
const parser = require('body-parser')
const TripController = require('./controllers/trips')
const UserController = require('./controllers/users')

app.use(parser.urlencoded({ extended: true }))
app.use(override('_method'))

app.set('views', './views')
app.set('view engine', 'pug')

app.use('/trips', TripController)
app.use('/users', UserController)

app.get('/', (req, res) => {
  res.render('home', { title: 'Jeff' })
})
app.set('port', process.env.PORT || 4000)

app.listen(app.get('port'), () => console.log('server running'))
