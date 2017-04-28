const PinterestStrategy = require('passport-pinterest').Strategy

const clientID = '4897021005790199447'
const clientSecret = 'bf394c7e09953782ec49b9832b33242d75afaceb7c9d0b7801f48a8d708b411c'
const scope = ['read_public', 'read_relationships']
const state = true

const verify = ( accessToken, refreshToken, profile, done ) => {

  return done( {} /* ERROR? */ , {} /* USER? */ )
}

const generateStategy = callbackURL =>
  new PinterestStrategy(
    { callbackURL: `${callbackURL}/pinterest/callback`, clientID, clientSecret, scope, state }, verify
  )

module.exports = generateStategy
