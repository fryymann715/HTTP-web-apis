require("babel-polyfill");
const express = require('express')
const logger = require('morgan')('combined')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const routes = require('./routes')
const session = require('express-session')
const TwitterStrategy = require('passport-twitter')
const passport = require('passport')

const getUrl = require('./config/url/')
const generatePinterestStrategy = require('./authentication/pinterest/')
const http = require('http')


const twitter = new TwitterStrategy({
    consumerKey: '4sUAsRJJkPoKu8CngVn6xXZTZ',
    consumerSecret: '8gnySWimlosUY5ad1Cw4aC71FZB3LyXwzL6K1yRTVEEtkQ5E26',
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    console.log( 'ASFJWNG' )
    let user = { name: 'USER', token }
    return cb( null, profile )
  }
)

passport.use( twitter )

passport.serializeUser(function(user, cb) {
cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
cb(null, obj);
});


const server = express()

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

server.get('/auth/twitter', passport.authenticate('twitter'))

server.get( '/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/yousucks' }),
  function(req, res) {
    res.send('THINGS')
  })

server.use( routes )


server.use( (request, response, next) => {
  let error = new Error('not found')
  error.status = 404
  //console.log( 'REQUEST:: ', request )
  next( error )
})

server.use( (request, response, next) => {
  response.status( error.status || 500 )
  response.json( { error:error.message || 'internal server error' } )
})

// getUrl( callbackURL => {

  server.listen( 3000 )
// })
/*
passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
*/
