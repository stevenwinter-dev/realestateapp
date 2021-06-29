document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
  });

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {});
  });

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
  });

const tabs = document.querySelector('.tabs')
var instance = M.Tabs.init(tabs, {});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.carousel');
  var instances = M.Carousel.init(elems, {indicators: true});
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.parallax');
  var instances = M.Parallax.init(elems, {});
});

const main = document.querySelector('main')
const deleteBtn = document.querySelectorAll('.delete-btn')
const editBtn = document.querySelector('#edit')
const editForm = document.querySelector('#edit-form')
const newBtn = document.querySelector('#create')
const newForm = document.querySelector('#new-form')
const newUserBtn = document.querySelector('#create-user')
const password = document.querySelector('#password')
const confirmPassword = document.querySelector('#confirmPassword')
const newUserForm = document.querySelector('#new-user-form')
const favoriteBtn = document.querySelectorAll('.favorite-btn')
const img = document.querySelector('#decode-img')
const flashMsg = document.querySelector('.flash-message')
const loginBtn = document.querySelector('#login-btn')
const loginForm = document.querySelector('#login-form')
const deleteFavBtn = document.querySelectorAll('.delete-fav-btn')
const changePwForm = document.querySelector('#change-pw-form')
const changePwBtn = document.querySelector('#change-pw')
const requestPwForm = document.querySelector('#request-password-form')
const requestPwBtn = document.querySelector('#request-password-btn')
const date = document.querySelector('#date')

function flashMsgRemove() {
  if(flashMsg) {
    setTimeout(() => {
      flashMsg.remove()
    },3000)
  }
}

flashMsgRemove()

if(requestPwBtn) {
  requestPwBtn.addEventListener('click', requestPwBtnHandler)
}

if(changePwBtn) {
  changePwBtn.addEventListener('click', changePwBtnHandler)
}

if(deleteFavBtn) {
  deleteFavBtn.forEach(btn => btn.addEventListener('click', deleteFavBtnHandler))
}

if(newBtn) {
  newBtn.addEventListener('click', newHandler)
}

if(loginBtn) {
  loginBtn.addEventListener('click', loginHandler)
}

if(editBtn) {
  editBtn.addEventListener('click', editHandler)
}

if(deleteBtn) {
  deleteBtn.forEach(btn => btn.addEventListener('click', deleteHandler))
}

if(newUserBtn) {
  newUserBtn.addEventListener('click', newUserHandler)
}

if(favoriteBtn) {
  favoriteBtn.forEach(btn => btn.addEventListener('click', favoriteHandler))
}

function requestPwBtnHandler() {
  requestPwForm.submit()
}

function changePwBtnHandler() {
  changePwForm.submit()
}

function deleteFavBtnHandler(e) {
  const form = e.target.parentElement
  form.submit()
}

function favoriteHandler(e) {
  const form = e.target.parentElement.parentElement
  form.submit()
}

function newHandler() {
  newForm.submit()
}

function loginHandler() {
  loginForm.submit()
}

function newUserHandler() {
  console.log(password.value)
  console.log(confirmPassword.value)
  if(password.value === confirmPassword.value) {
    newUserForm.submit()
  } else {
    const error = document.createElement('p')
    error.innerHTML = `Incorrect password`
    error.classList.add('flash-message')
    error.classList.add('red')
    error.classList.add('accent-3')
    main.append(error)
      setTimeout(() => {
        error.remove()
      },3000)
    }
  
}

function editHandler() {
  editForm.submit()
}

function deleteHandler(e) {
  const deleteForm = e.target.parentElement
  console.log(deleteForm)
  deleteForm.submit()
}