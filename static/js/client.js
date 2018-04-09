let shortenButton = document.getElementById("shorten")
shortenButton.addEventListener("click", shortenUrl)

function shortenUrl (){
  let urlInput = document.getElementById("longURL")
  postData('/shorten', {url: urlInput.value})
  .then(data => {
    if (data.status === "success"){
      displayShortUrl(data.short_url)
    } else {
      displayError(data.reason)
    }
  })
  .catch(error => console.error(error))
}

function displayShortUrl (url) {
  alert(url)
}

function displayError (reason) {
  console.log(reason)
}

function postData(url, data) {
  return fetch(url, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST'
  })
  .then(response => response.json())
}
