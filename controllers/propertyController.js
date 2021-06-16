const express = require('express')
const router = express.Router()
const Property = require('../models/property')
const multer  = require('multer')
const User = require('../models/user')
const storage = multer.memoryStorage()
const uploads = multer({ storage: storage })

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, '../project2-real-estate/public/images')
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + '--' + file.originalname)
//     }
// }) 
const fileFilter = (req, file, cb) => {

    //if the filetype is not right
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

function isLoggedIn(req, res, next) {
    if(req.user) {
        console.log(req.user.id)
    }
    if (req.isAuthenticated()) return next()
    res.redirect('/user/login')
}

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
    console.log(`properties user logged in? ${req.user}`)
    Property.find({})
    .populate('seller')
    .then(property => res.render('index', {property}))
    .catch(next)
})

//ADD FAVORITE
router.post('/favorites', isLoggedIn, (req, res, next) => {
    // console.log(`favorites route: ${req.user.id}`)
    // console.log(`favorites route: ${req.body.id}`)
    const userId = req.user.id
    const listingId = req.body.id
    User.findOneAndUpdate(
        {_id: userId},
        { $push: {favorites: listingId} }
        )
        .then(
            Property.find({})
            .populate('seller')
            .then(property => res.render('index', {property}))
            .catch(next)
        )
    .catch(next)
} )

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


router.post('/upload', upload.single('image'), (req, res, next) => {
    console.log(req.file)
    console.log(JSON.stringify(req.file))
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    response += `<img src="${req.file.path}" /><br>`
    res.send(response)
})
//TEST MULTER PROPERTY CREATE
// router.post('/', upload.single('img'), (req, res, next) => {
//     // img: {data: req.file.buffer}
//     Property.create({
//         seller: req.body.seller,
//     price: req.body.price,
//     address: req.body.address,
//     city: req.body.city,
//     state: req.body.state,
//     zip: req.body.zip,
//     bedrooms: req.body.bedrooms,
//     baths: req.body.baths,
//     img: req.file,
//     description: req.body.description
//     })
//     .then(property => res.render('property', {property}))
//     .catch(next)
// })




//CREATE
router.post('/', upload.single('img'), (req, res, next) => {
    // console.log(req.body)
    console.log(req.file)
    //image: {data: req.file.buffer, contentType: req.file.mimetype}
    Property.create({
        seller: req.body.seller,
        price: req.body.price,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        bedrooms: req.body.bedrooms,
        baths: req.body.baths,
        imgURL: req.body.imgURL,
        img: {data: req.file.buffer, contentType: req.file.mimetype},
        description: req.body.description
    })
    .then(property => {
        console.log(property)
        res.render('property', {property})
    })
    .catch(next)
})

//UPDATE
router.put('/:id', upload.single('img'), (req, res) => {
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
            imgURL: req.body.imgURL,
            img: {data: req.file.buffer, contentType: req.file.mimetype},
            description: req.body.description
        },
        { new: true },
        )
        .then(property => res.render('property', {property}))
        .catch(console.error)
})

//DELETE
// router.delete('/:id', (req, res, next) => {
//     const id = req.params.id
//     Property.findOneAndDelete({_id: id})
//     .then(() => {
//         Property.find({})
//         .then(property => res.render('index', {property}))
//     })
//     .catch(next)
// })

router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    Property.findOneAndDelete({_id: id})
    .then(() => {
        Property.find({})
        .then(properties => res.render('dashboard', {properties}))
    })
    .catch(next)
})

//WORKING ON DELETE
// router.delete('/:id', (req, res, next) => {
//     const id = req.params.id
//     console.log(req.params)  
//     console.log(`console log 103 ${req.body}`)
//     console.log(`console log 104 ${req.params}`)
//     Property.findOneAndDelete({_id: id})
//     .then(() => {
//         Property.find({id: req.user.seller})
//         .populate('seller')
//         .then(properties => res.render('dashboard', {property: properties}))
//     })
//     .catch(next)
// })

module.exports = router