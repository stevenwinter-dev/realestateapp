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

const deleteBtn = document.querySelectorAll('.delete-btn')
const editBtn = document.querySelector('#edit')
const editForm = document.querySelector('#edit-form')
const newBtn = document.querySelector('#create')
const newForm = document.querySelector('#new-form')
const newUserBtn = document.querySelector('#create-user')
const newUserForm = document.querySelector('#new-user-form')
const favoriteBtn = document.querySelectorAll('.favorite-btn')
const img = document.querySelector('#decode-img')
const flashMsg = document.querySelector('.flash-message')
const loginBtn = document.querySelector('#login-btn')
const loginForm = document.querySelector('#login-form')
const deleteFavBtn = document.querySelectorAll('.delete-fav-btn')

function flashMsgRemove() {
  if(flashMsg) {
    setTimeout(() => {
      flashMsg.remove()
    },3000)
  }
}

flashMsgRemove()

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
  newUserForm.submit()
}

function editHandler() {
  editForm.submit()
}

function deleteHandler(e) {
  const deleteForm = e.target.parentElement
  console.log(deleteForm)
  console.log('hiiii')
  deleteForm.submit()
}
