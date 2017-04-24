import pinterestAPI from 'pinterest-api'

const apiHandler = {
  getAccount: name => {
    return pinterestAPI( name )
  },

  getPins: accountObject => {
    return new Promise( ( resolve, reject ) =>
        accountObject.getPins( pins =>
          resolve( pins ) ) )
  },

}

/*

Example of how this shit works.

const testIan = apiHandler.getAccount ("ideans")


apiHandler.getPins( testIan )
          .then( pins => {
            console.log(pins)
})
*/