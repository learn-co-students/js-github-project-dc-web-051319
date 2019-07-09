document.addEventListener('DOMContentLoaded', init)

function init() {
  form().addEventListener('submit', searchUsers)
}

const searchUsers = () => {
  event.preventDefault()
  const USER_SEARCH = "https://api.github.com/search/users?q="
  const query = form().firstElementChild.value

  fetch(USER_SEARCH + query)
  .then(r => r.json()).then(users => renderUsers(users.items))
}

const renderUsers = (users) => {
  userList().innerHTML = ""
  users.forEach(user => renderUser(user))
}

const renderUser = (user) => {
  const {avatar_url: avatar, html_url: url, login: username } = user
  const li = document.createElement('li')
  li.addEventListener('click', fetchRepos)
  li.innerHTML = `
    <div class="user-container">
      <div class="user-image">
        <img src="${avatar}">
      </div>
      <div class="user-info">
        <h2>${username}</h2>
      </div>
    </div>`
  userList().appendChild(li)
}

const fetchRepos = () => {
  if (document.querySelector('.active')) {
    document.querySelector('.active').classList.remove('active')
  }
  event.target.closest('li').classList.add('active')
  const username = event.target.innerText
  const USER_REPO = `https://api.github.com/users/${username}/repos`
  fetch(USER_REPO)
  .then(r => r.json())
  .then(repos => renderRepos(repos, username))
}

const renderRepos = (repos, username) => {
  reposList().innerHTML = ""
  const h1 = document.createElement('h1')
  h1.innerText = `${username}'s GitHub Repos:`
  reposList().appendChild(h1)
  repos.forEach(repo => renderRepo(repo))
}

const renderRepo = (repo) => {
  const {name, html_url: url, language, watchers, forks, created_at: published} = repo
  const age = Date.now() - Date.parse(published)
  const days = parseInt(age / 1000 / 60 / 60 / 24)
  const li = document.createElement('li')
  li.innerHTML = `
  <h2><a href="${url}" target="_blank">${name}</a></h2>
  <p>${language} / Watched by ${watchers} / Forked by ${forks} / Created ${days} days ago</p>
  <hr>
  `
  reposList().appendChild(li)
}

const form = () => document.getElementById('github-form')
const userList = () => document.getElementById('user-list')
const reposList = () => document.getElementById('repos-list')