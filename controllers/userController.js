const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
    User.find({})
    .populate('listings')
    .then(users => res.render('users', {users}))
})

router.get('/new', (req, res) => {
    res.render('newUser')
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    User.findById(id)
    .then(user => res.json(user))
})

router.post('/', (req, res, next) => {
    console.log(req.body)
    User.create(req.body)
    .then(user => res.render('users', {user}))
    .catch(next)
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    User.findOneAndUpdate(
        {_id: id},
        {
            email: req.body.email,
            password: req.body.password
        },
        { new: true },
        )
        .then(user => res.render('users', {user}))
        .catch(console.error)
})

router.delete('/', (req, res) => {
    const id = req.params.id
    User.findOneAndDelete({_id: id})
    .then(() => {
        User.find({})
        .then(user => res.render('users', {user}))
    })
    .catch(next)
})

module.exports = router