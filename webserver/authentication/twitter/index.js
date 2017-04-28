const TwitterStrategy = require('passport-twitter')
const dotenv = require('dotenv')
dotenv.load()

module.exports = new TwitterStrategy({
    consumerKey: process.env.PASSPORT_TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.PASSPORT_TWITTER_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    let user = { name: 'USER', token }
    return cb( null, profile )
  }
)
