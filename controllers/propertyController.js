const express = require('express')
const router = express.Router()
const Property = require('../models/property')

//SHOW ALL
router.get('/', (req, res, next) => {
    Property.find({})
    .then(property => res.render('index', {property}))
    .catch(next)
})

//NEW
router.get('/new', (req, res, next) => {
    res.render('new')
})

//SHOW ONE
router.get('/:id', (req, res, next) => {
    const id = req.params.id
    Property.findById(id)
    .populate('seller')
    .then(property => res.render('property', {property}))
})



//CREATE
router.post('/', (req, res, next) => {
    console.log(req.body)
    Property.create(req.body)
    .then(property => res.render('property', {property}))
    .catch(next)
})

//UPDATE
router.put('/:id', (req, res) => {
    console.log(req.body)
    console.log(`this is the id ${req.params.id}`)  
    const id = req.params.id
    Property.findOneAndUpdate(
        {_id: id},
        {
            seller: req.body.seller,
            price: req.body.price,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            bedrooms: req.body.bedrooms,
            baths: req.body.baths,
            img: req.body.img,
            description: req.body.description
        },
        { new: true },
        )
        .then(property => res.render('property', {property}))
        .catch(console.error)
})

//DELETE
router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    Property.findOneAndDelete({_id: id})
    .then(() => {
        Property.find({})
        .then(property => res.render('index', {property}))
    })
    .catch(next)
})

module.exports = router