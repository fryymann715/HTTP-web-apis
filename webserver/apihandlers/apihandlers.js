import pinterestAPI from 'pinterest-api'

const apiHandler = {
  getAccount: name => {

    const account = pinterestAPI( name )
    console.log(account.getPins);
    return account
  },

  getPins: accountObject => {
    return new Promise( ( resolve, reject ) =>
        accountObject.getPins( pins =>
          resolve( pins ) ) )
  },

}

const testIan = apiHandler.getAccount ("231341^$^$$#")

// apiHandler.getPins( testIan )
//           .then( pins => {
//             console.log(pins)
// })
