document.addEventListener('DOMContentLoaded', () => {
  const tweetForm = document.querySelector('.editTweetForm')

  tweetForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const tweetID = document.getElementById( 'tweetID' ).value
    const status = document.getElementById( 'msg' ).value
    const media_url = document.getElementById( 'img' ).value
    const body = JSON.stringify({ status, media_url, tweetID })
    var init = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      mode: 'cors',
      cache: 'default',
      body: body
    }
    fetch('/edit/'+tweetID, init)
    .then( fetchContainer => {
      // localStorage.setItem('log', fetchContainer)
      return fetchContainer.text()
    })
    .then( redirectPath => {
      // localStorage.setItem('log', redirectPath)
      window.location.href = redirectPath
    })
    .catch( error => {
      console.log(error)
    })
  })
})
