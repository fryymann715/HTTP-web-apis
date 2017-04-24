import pinterestAPI from 'pinterest-api'

const apiHandler = {
  getAccount: name => {
    return pinterestAPI( name )
  },

  getPins: accountObject => {
    console.log("account object ========>", accountObject );
    return Promise.resolve( accountObject.getPins( pins => pins ) )
  }

}


const testIan = apiHandler.getAccount ("ideans")
console.log( apiHandler.getPins( testIan ) )
