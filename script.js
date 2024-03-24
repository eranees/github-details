const form = document.getElementById("form")
const username = document.getElementById("username")
const error = document.getElementById("usernameHelp")
const baseUrl = "https://api.github.com/users/"
form.addEventListener("submit", function (e) {
  e.preventDefault()
  if (username.value === '') {
    error.innerHTML = "Enter username"
    error.style.color = "red"
    return
  }
  const xhr = new XMLHttpRequest()
  xhr.open("GET", baseUrl + username.value)
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status === 200) {
        const data = JSON.parse(this.responseText)
        error.style.color = "green"
        error.innerHTML = "Valid username"
        displayCard(data)
      } else if (xhr.status === 404) {
        error.style.color = "red"
        error.innerHTML = "Enter valid username"
        document.getElementById('githubDetails').innerHTML = "Username not found"
      } else {
        document.getElementById('githubDetails').innerHTML = xhr.status
      }
    }
  }
  xhr.send()
})


function displayCard(data) {
  document.getElementById('githubDetails').innerHTML = `
<div class="card" style="width: 30rem;">
  <img src="${data.avatar_url}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${data.name}</h5>
    <p class="card-text">${data.bio}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Location: ${data.location}</li>
    <li class="list-group-item">Company: ${data.company}</li>
    <li class="list-group-item">Repos: ${data.public_repos}</li>
    <li class="list-group-item">Followers: ${data.followers}</li>
    <li class="list-group-item">Following: ${data.following}</li>
    <li class="list-group-item">Created At: ${new Date(data.created_at).toLocaleDateString()}</li>
    <li class="list-group-item">Updated At: ${new Date(data.updated_at).toLocaleDateString()}</li>
  </ul>
  <div class="card-body">
  </div>
</div>
  `
}