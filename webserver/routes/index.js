const express = require('express')
const router = express.Router()
const http = require('http');
const querystring = require( 'querystring' )
const passport = require('passport')

router.get('/', (request, response, next) => {
  response.json({ test: 'this is a test' })
})

router.get('/auth/twitter', passport.authenticate('twitter'))

router.get( '/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/yousucks' }),
  function(req, res) {
    res.send('Things')
  })


/*

https://api.twitter.com/1.1/search/tweets.json?q=%40twitterapi

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


module.exports = router
