const express = require('express')
const Property = require('../models/property')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const salt = 10
const session = require('express-session')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy


router.use(session({
    secret: 'secretkey',
    resave: true,
    saveUninitialized: true
}))

router.use(passport.initialize())
router.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})

passport.use(new localStrategy({usernameField: 'email'}, (email, password, done) => {
    User.findOne({email: email}, (err, user) => {
        if(err) return done(err)
        if(!user) {
            return done(null, false, {message: 'Email not found'})
        }

        bcrypt.compare(password, user.password, (err, res) => {
            if(err) return done(err)
            if(res === false) return done(null, false,{ message: 'Wrong password'})
            return done(null, user)
        })
    })
}))

function isLoggedIn(req, res, next) {
    if(req.user) {
        // console.log(req.user.id)
    }
    if (req.isAuthenticated()) return next()
    res.redirect('/user/login')
}

router.get('/', (req, res) => {
    User.find({})
    .populate('listings')
    .then(users => res.render('users', {users}))
})

router.get('/dashboard', isLoggedIn, (req, res) => {
    Property.find({seller: req.user.id})
    .populate('seller')
    .then(properties => {
        console.log(properties)
        res.render('dashboard', {properties})
    })
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/user/dashboard',
    failureRedirect: '/user/login?error=true'
}))
// router.post('/login', (req, res, next) => { passport.authenticate('local', {
//     successRedirect: '/user/dashboard',
//     failureRedirect: '/user/login?error=true',
//     failureFlash: true
// })(req, res, next))

router.get('/register', (req, res, next) => {
    res.render('register')
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    // User.findById(id)
    Property.find({seller: id})
    .populate('seller')
    .then(property => res.render('user', {property}))
})

router.post('/register', (req, res, next) => {
    console.log(req.body.email)
    bcrypt.genSalt(salt, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            User.create({
                email: req.body.email,
                password: hash
            })
            .then(user => res.render('login'))
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