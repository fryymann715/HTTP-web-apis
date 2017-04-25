require("babel-polyfill");
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const routes = require('./routes')
const session = require('express-session')
// const fs = require('fs')
const passport = require('passport')

const getUrl = require('./config/url/')
const generatePinterestStrategy = require('./authentication/pinterest/')

const http = require('http')
// const https = require('https')

const server = express()

server.use( logger( "default" ) )
server.use( bodyParser.json() )
server.use( bodyParser.urlencoded( { extended: true } ) )
server.use( cookieParser() )

server.use( session({
  secret: 'lkjlk',
  cookie: {},
  resave: true,
  saveUninitialized: true
}))

server.get('/auth/pinterest', passport.authenticate('pinterest'))

server.use( routes )


server.use( (request, response, next) => {
  let error = new Error('not found')
  error.status = 404
  next( error )
})

server.use( (request, response, next) => {
  response.status( error.status || 500 )
  response.json( { error:error.message || 'internal server error' } )
})

getUrl( callbackURL => {
  passport.use( generatePinterestStrategy( callbackURL ))
  server.use( passport.initialize() )
  server.use( passport.session() )


  server.listen( 3000 )
})
