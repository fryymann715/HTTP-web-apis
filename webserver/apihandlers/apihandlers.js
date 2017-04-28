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
