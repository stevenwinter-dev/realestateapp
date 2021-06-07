const express = require('express')
const router = express.Router()
const Property = require('../models/property')

//SHOW ALL
router.get('/', (req, res, next) => {
    Property.find({})
    .then(property => res.render('index', {property}))
    .catch(next)
})

//60be6a9341db8aae67dd1373
//SHOW ONE
router.get('/:id', (req, res, next) => {
    const id = req.params.id
    Property.findById(id)
    .then(property => res.render('property', {property}))
})

//DELETE
router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    Property.findOneAndDelete({_id: id})
    .then(() => {
        Property.find({})
        .then(gifs => res.json(gifs))
    })
    .catch(next)
})

module.exports = router