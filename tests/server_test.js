const app = require('../index')
const assert = require('assert')
const http = require('http')
const pages = ['/trips', '/users/signup', '/users/login']
const url = 'http://localhost:5000'

describe('tests', () => {
  before(() => {
    app.listen(5000)
  })

  // tests to make sure server is up and pages return valid codes on main pages

  describe('server', () => {
    it('should start server', done => {
      http.get(url, res => {
        assert.equal(200, res.statusCode)
        done()
      })
    })
    it('should render login', done => {
      http.get(url + pages[2], res => {
        assert.equal(200, res.statusCode)
        done()
      })
    })
    it('should render trips', done => {
      http.get(url + pages[0], res => {
        assert.equal(200, res.statusCode)
        done()
      })
    })
    it('should render signup', done => {
      http.get(url + pages[1], res => {
        assert.equal(200, res.statusCode)
        done()
      })
    })
  })

  // testing tests
  describe('math', () => {
    it('should do math', () => {
      let total = 2 + 2
      assert.notEqual(total, 5)
    })
  })

  // testings trip controller

  // testing users controller

  // testing passport
})
