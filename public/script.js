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

const deleteBtn = document.querySelector('#delete')
const deleteForm = document.querySelector('#form-delete')
const editBtn = document.querySelector('#edit')
const editForm = document.querySelector('#edit-form')
const newBtn = document.querySelector('#create')
const newForm = document.querySelector('#new-form')
const newUserBtn = document.querySelector('#create-user')
const newUserForm = document.querySelector('#new-user-form')


if(newBtn) {
  newBtn.addEventListener('click', newHandler)
}

if(editBtn) {
  editBtn.addEventListener('click', editHandler)
}

if(deleteBtn) {
  deleteBtn.addEventListener('click', deleteHandler)
}

if(newUserBtn) {
  newUserBtn.addEventListener('click', newUserHandler)
}

function newHandler() {
  newForm.submit()
}

function newUserHandler() {
  newUserForm.submit()
}

function editHandler() {
  editForm.submit()
}

function deleteHandler() {
  deleteForm.submit()
}
