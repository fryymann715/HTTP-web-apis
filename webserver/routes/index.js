const express = require('express')
const http = require('http')

const router = express.Router()
router.get('/', (request, response, next) => {
  response.send('test')
} )

router.get('/login', (request, response, next) => {

  // const headers = new Headers({
  //   'Accept': 'text/plain'
  // });

  const initSettings = { method: 'GET',
                //  headers: headers,
                 mode: 'cors' }

  const url = 'https://api.pinterest.com/oauth/?response_type=code&redirect_uri=https://789ee446.ngrok.io/redirect&client_id=4897021005790199447&scope=read_public,write_public&state=768uyFys'

  fetch(url, initSettings)
  .then( response => {
    return response.text()
  }).then( responseText => {
    console.log('fetch response', responseText)
    response.send(responseText)
  });
} )

router.get('/redirect:qs', (request, response, next) => {
  // console.log()
  console.log(request.params)
  console.log(request.body)
  response.send('works')
})

router.get('/redirect', (request, response, next) => {
  // console.log()
  console.log(request.params)
  console.log(request.body)
  response.send('works')
})






module.exports = router
