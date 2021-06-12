const express = require('express')
const Property = require('../models/property')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const salt = 10

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
    // User.findById(id)
    Property.find({seller: id})
    .populate('seller')
    .then(property => res.render('user', {property}))
})

router.post('/', (req, res, next) => {
    console.log(req.body.email)
    bcrypt.genSalt(salt, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            User.create({
                email: req.body.email,
                password: hash
            })
            .then(user => res.render('user'))
            .catch(next)
        });
    });
    
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