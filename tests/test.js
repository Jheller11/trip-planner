const expect = require('chai').expect
// files to be tested
const index = require('../index.js')

describe('index', () => {
  before(() => {
    index.listen(4000)
  })
  after(() => {
    index.close()
  })
})

const assert = require('assert')
const http = require('http')

describe('/', () => {
  it('should start server', done => {
    http.get('http://localhost:4000', res => {
      assert.equal(200, res.statusCode)
      done()
    })
  })
  const pages = ['/trips', '/signup', '/login']
  const url = 'http://localhost:4000'
  pages.forEach(page => {
    it('should display' + page, done => {
      http.get(url + page, res => {
        assert.equal(200, res.statusCode)
      })
      done()
    })
  })
})
