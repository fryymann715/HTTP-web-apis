const express = require('express')
const http = require('http')

const router = express.Router()
router.get('/', (request, response, next) => {
  response.send('test')
} )

router.get('/login', (request, response, next) => {
  const url = 'https://api.pinterest.com/oauth/?response_type=code&redirect_uri=https://789ee446.ngrok.io/redirect&client_id=4897021005790199447&scope=read_public,write_public&state=768uyFys'

  http.get({
    host: 'api.pinterest.com',
    path: url
  }, responseText => {
    let body = ''
    responseText.on('data', data => {
      body += data
    })

    responseText.on('end', () => {
      console.log('body is:', body)
      response.send(body)
      console.log('finishing')
    })
  })
} )

router.get('/redirect', (request, response, next) => {
  console.log('just entered bad redirect area')
  response.send('no query string provided', request.query.sample)
  // response.sendStatus(200)
})

module.exports = router
