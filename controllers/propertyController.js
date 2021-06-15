const express = require('express')
const router = express.Router()
const Property = require('../models/property')
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../project2-real-estate/public/images')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '--' + file.originalname)
    }
}) 
const upload = multer({ storage: storage })

router.get('/upload', (req, res) => {
    res.render('upload')
})

router.post('/upload', upload.single('image'), (req, res, next) => {
    console.log(req.file)
    
    
    console.log(JSON.stringify(req.file))
  var response = '<a href="/">Home</a><br>'
  response += "Files uploaded successfully.<br>"
  response += `<img src="${req.file.path}" /><br>`
    
    res.send(response)
  })


//SHOW ALL
router.get('/', (req, res, next) => {
    Property.find({})
    .populate('seller')
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

//WORKING ON DELETE
// router.delete('/:id', (req, res, next) => {
//     const id = req.params.id
//     Property.findOneAndDelete({_id: id})
//     .then(() => {
//         Property.find({seller: req.user.seller})
//         .populate('seller')
//         .then(properties => res.render('dashboard', {properties}))
//     })
//     .catch(next)
// })

module.exports = router