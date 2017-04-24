const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const routes = require('./routes')

const server = express()

server.use( logger( "default" ) )
server.use( bodyParser.json() )
server.use( bodyParser.urlencoded( { extended:false } ) )
server.use( cookieParser() )

server.use( express.static( path.join( __dirname, 'public') ) )
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

server.listen( 3000 )

module.exports = server
