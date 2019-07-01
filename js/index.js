// document.addEventListener('DOMContentLoaded', ()=>{})
const id = document.getElementById('main')
const div = document.getElementById('github-container')

const repoUl = document.getElementById('repos-list')
const input = document.getElementById('search')
const USERS_URL = 'https://api.github.com/search/users?q='



const form = document.getElementById('github-form')
form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  let username = form[0].value

  fetch(USERS_URL + username)
    .then(response => response.json())
    .then(json => {
      showSomeStuff(json)
    })
})

function showSomeStuff(json) {
  const ul = document.getElementById('user-list')
  for (let i = 0; i < json.items.length; i++) {
    const li = document.createElement('li')
    let span = document.createElement('span')
    let img = document.createElement('img')
    img.src = json.items[i].avatar_url
    li.textContent = json.items[i].login
    li.appendChild(span)
    span.appendChild(img)
    ul.appendChild(li)
  }
}