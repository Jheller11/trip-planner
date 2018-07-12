const app = require('express')()
const override = require('method-override')
const parser = require('body-parser')

app.use(parser.urlencoded({ extended: true }))
app.use(override('_method'))

app.get('/', (req, res) => {
  res.send('working')
})
app.set('port', process.env.PORT || 4000)

app.listen(app.get('port'), () => console.log('server running'))
