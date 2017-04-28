require("babel-polyfill");
const express = require('express')
const logger = require('morgan')('dev')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const routes = require('./routes')
const session = require('express-session')
const passport = require('passport')
const pug = require('pug')

const server = express()

const TwitterStrategy = require('./authentication/twitter')
passport.use( TwitterStrategy )
passport.serializeUser(function(user, cb) {
  cb(null, user)
})
passport.deserializeUser(function(obj, cb) {
  cb(null, obj)
})

server.use( logger )
server.use( bodyParser.json() )
server.use( bodyParser.urlencoded( { extended: true } ) )
server.use( cookieParser() )

server.use( session({
  secret: 'lkjlk',
  cookie: {},
  resave: true,
  saveUninitialized: true
}))
server.use( passport.initialize() )
server.use( passport.session() )

server.use(express.static(path.join(__dirname, 'public')))

server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'pug');

server.use( routes )

/* Error Handlers */
server.use( (request, response, next) => {
  let error = new Error('not found')
  error.status = 404
  next( error )
})

server.use( (request, response, next) => {
  response
    .status( error.status || 500 )
    .json( { error: error.message || 'internal server error' } )
})

server.listen( 3000 )
