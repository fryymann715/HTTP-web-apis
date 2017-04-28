

function deleteTweet(id_str){
  var init = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    mode: 'cors',
    cache: 'default'
  }
  fetch('/delete/'+id_str, init)
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
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#yesButton').addEventListener('click', function() {
    deleteTweet(document.querySelector('h5').innerHTML)
  })
})
