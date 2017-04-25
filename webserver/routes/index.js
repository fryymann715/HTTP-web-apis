const express = require('express')
const twitterApi = require('twitter')
const router = express.Router()
const https = require('https');
const querystring = require( 'querystring' )
const passport = require('passport')

router.get('/', (request, response, next) => {
  response.json({ test: 'this is a test' })
})

router.get( '/auth/twitter/callback', ( request, response, next ) => {
  console.log( 'INSIDE THE CALLBACK')
  passport.authenticate('twitter', { failureRedirect: '/' }),
   function(req, res) {
     // Successful authentication, redirect home.
     response.json(({ worked: 'The shit worked.'}))
   }
})

const twitThing = new twitterApi({
  consumer_key: '4sUAsRJJkPoKu8CngVn6xXZTZ',
  consumer_secret: '8gnySWimlosUY5ad1Cw4aC71FZB3LyXwzL6K1yRTVEEtkQ5E26',
  access_token_key: '769793430-4QciEWdCK9hkT72iuwt7ElyTpeCDq2S1zi0y8kEj',
  access_token_secret:  'nSGQIiLJuxnJeNikYoEq8dcV9TktdiCmiXTwquosaU0Zs'
})

router.get( '/feed', (request, response, next ) => {
  twitThing.get( 'statuses/user_timeline', { 'q': { screen_name: 'ideans715', recent:'mixed'} }, (error, tweets, twitterResponse) => {
    response.json(tweets)
  })
})

/*
router.get('/pinterest/callback', (request, response, next) => {
  const params = {
    grant_type: 'authorization_code',
    client_id: '4897021005790199447',
    client_secret: 'bf394c7e09953782ec49b9832b33242d75afaceb7c9d0b7801f48a8d708b411c',
    code: request.query.code
  }

  const body = querystring.stringify( params )
  const options = {
    hostname: 'api.pinterest.com',
    port: 443,
    path: `/v1/oauth/token?${body}`,
    method: 'POST'
  }

  console.log( 'sending request', options )
  // response.json( request.query )
  const r = https.request( options, blarg => {
    let result = ''

    blarg.on( 'data', data => {
      console.log( 'received ', data )
      result += data
    })
    blarg.on( 'end', () => {
      console.log( result )
      setToken( result.access_token )
      response.json( JSON.parse( result ) )

    })
  })

  r.end()
})
*/
/*
postBody = querystring.stringify(postData);
//init your options object after you call querystring.stringify because you  need
// the return string for the 'content length' header

options = {
   //your options which have to include the two headers
   headers : {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postBody.length
   }
};


var postreq = https.request(options, function (res) {
        //Handle the response
});
postreq.write(postBody);
postreq.end();
*/

/*
https://api.pinterest.com/v1/oauth/token with the following parameters.
Parameter 	Description
grant_type 	Must take the value authorization_code.
client_id 	Your app ID. You can get this ID from your app page.
client_secret 	Your app secret. You can get this from your app page.
code 	The access code you received from your redirect URI.
*/


module.exports = router
