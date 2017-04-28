// const http = require( 'http' )
//
// const getUrl = callback => {
//   if( process.env.NODE_ENV === 'development' ) {
//
//     http.get({ host: 'localhost', port: 4040, path: '/api/tunnels' }, response => {
//       let body = ''
//
//       response.on( 'data', data => body += data )
//       response.on( 'end', () => {
//         const json = JSON.parse( body )
//
//         callback( json.tunnels[ 1 ].public_url )
//       })
//     })
//   } else {
//     callback( process.env.URL )
//   }
// }
//
// module.exports = getUrl
