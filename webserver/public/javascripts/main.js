document.addEventListener('DOMContentLoaded', () => {
  const msg = document.querySelector('#msg')
  const submit = document.querySelector('#submit')

  submit.addEventListener('click', () => {
    var init = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify({msg: msg.value})
    }
    fetch('/create', init)
    .then( response => response.text())
    .then( response => {
      console.log(response)
    })
    // const xhr = new XMLHttpRequest()
    // xhr.open('POST', 'http://127.0.0.1:3000/create')
    // xhr.onreadystatechange = (...events) => {
    //   console.log(events)
    // }
    // xhr.setRequestHeader('Access-Control-Allow-Origin', true)
    // xhr.send(msg.text)

  })
})
