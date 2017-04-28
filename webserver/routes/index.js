const express = require('express')
const router = express.Router()
const twitterAPI = require('../config/twitterAPI')
const passport = require('passport')

router.get('/', (request, response, next) => {
  response.json({ test: 'this is a test' })
})

router.get('/auth/twitter', passport.authenticate('twitter'))
router.get( '/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/error' }),
  (req, res) => {
    res.send('successful authentication')
  })

router.get( '/home', (request, response, next ) => {
  twitterAPI.get(
    'statuses/user_timeline',
    { 'q': {
      screen_name: 'resoltz',
      recent:'mixed'}
    },
    (error, tweets, twitterResponse) => {
      if ( error ) {
        let err = new Error('User timeline not fetched.')
        next(err)
      }
      response.json( tweets )
  })
})

router.get( '/feed', (request, response, next ) => {
  twitterAPI.get(
    'statuses/user_timeline',
    { 'q': {
      screen_name: 'resoltz',
      recent:'mixed'}
    },
    (error, tweets, twitterResponse) => {
      if ( error ) {
        next( error )
      } else {
        response.render('tweetfeed', {
          tweets
        })

      }
  })
})

router.get('/create', (request, response, next) => {
  response.render('tweetcreate')
})
router.post('/create', (request, response, next) => {
  const newTweet = {
    status: request.body.status,
  }
  twitterAPI.post( 'statuses/update', newTweet, (error, tweet, tweetResponse) => {
    if (!error) {
      response.send('/feed')
    } else {
      response.send('/error')
    }
  })
})

router.get('/edit/:id', (request, response, next) => {
  let id = request.params.id
  let editTweet
  twitterAPI.get(
    'statuses/user_timeline',
    { 'q': {
      screen_name: 'resoltz',
      recent:'mixed'}
    },
    (error, tweets, twitterResponse) => {
      for (tweet in tweets) {
        if(parseInt(tweets[tweet].id) === parseInt(id )) {
          editTweet = tweets[tweet]
        }
      }
      response.render('tweetedit', {
        editTweet
      })
    })
})
router.put('/edit/:id', ( request, response, next ) => {
  let { id } = request.params
  let editTweet = request.body
  twitterAPI.post(
    'statuses/update.json',
    { status:request.body.status },
    (error, tweets, twitterResponse) => {
      response.send('/feed')
  })
})

router.get('/delete/:id', (request, response, next) => {
  let id_str = request.params.id
    response.render('tweetDelete', {
      id_str
    })
  })

router.delete('/delete/:id_str', (request, response, next) => {
  let id_str = request.params.id_str
  twitterAPI.post(
    'statuses/destroy/'+id_str+'.json',
    (error, tweets, twitterResponse) => {
        response.send('/feed')
  })
})

module.exports = router
