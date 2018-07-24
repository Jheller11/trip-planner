const index = require('../index.js')
const assert = require('assert')
const http = require('http')
const pages = ['/trips', '/signup', '/login']
const url = 'http://localhost:4000'
const expect = require('chai').expect

// tests for trip controller
