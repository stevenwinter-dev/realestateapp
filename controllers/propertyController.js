const express = require('express')
const router = express.Router()
const Property = require('../models/property')
const multer  = require('multer')
const User = require('../models/user')
const storage = multer.memoryStorage()
const uploads = multer({ storage: storage })
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport')

let transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
}))

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
    // console.log(`USER: ${req.user}`)
    Property.find({})
    .populate('seller')
    .then(property => res.render('index', {property, user: req.user}))
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
            // .then(property => res.redirect('../user/dashboard'))
            .then(property => res.render('index', {property, user: req.user}))
            .catch(next)
        )
    .catch(next)

    let mailOptions = {
        from: 'realestateappproject2@gmail.com',
        to: req.user.email,
        subject: 'Favorite Property Added!',
        html:
        '<body style="background-color: #004e92; height:150px;">' + '<div>' +'<h2 style="color:white;">You added a favorite property!</h2>' 
        + '<a href=https://blooming-fortress-96429.herokuapp.com/property/ style="color:white;"' 
        + req.body.id + '>Check it out!</a>' + '</div>' + '</body>'
    }
    
    transporter.sendMail(mailOptions, (err, data) => {
        if(err) {
            console.log('Error', err)
        } else {
            console.log('Email sent')
        }
    })
})

//REMOVE FAVORITE
router.put('/favorite/:id', isLoggedIn, (req, res) => {
    const userId = req.user.id
    const favId = req.params.id
    User.findByIdAndUpdate(userId, {
        $pull: { favorites: favId } }
    )
    .then(Property.find({seller: req.user.id})
    .populate('seller')
    .then(() => {
        Property.find({})
        .then(properties => res.redirect('../../user/dashboard'))
    }))
})

//NEW
router.get('/new', isLoggedIn, (req, res, next) => {
    const userId = req.user.id
    res.render('new', {userId, user: req.user})
})

//SHOW ONE
router.get('/:id', (req, res, next) => {
    const id = req.params.id
    Property.findById(id)
    .populate('seller')
    .then(property => res.render('property', {property, user: req.user}))
})


router.post('/upload', upload.single('image'), (req, res, next) => {
    console.log(req.file)
    console.log(JSON.stringify(req.file))
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    response += `<img src="${req.file.path}" /><br>`
    res.send(response)
})

//CREATE
router.post('/', upload.single('img'), isLoggedIn, (req, res, next) => {
    // console.log(req.body)
    let imgURLArray
    if(req.body.imgURL) {
        console.log(req.body.imgURL)
        imgURLArray = req.body.imgURL.split(' ')
    }
    let uploadImg
    if(req.file != undefined) {
        uploadImg = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
    }
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
        imgURL: imgURLArray,
        img: uploadImg,
        description: req.body.description
    })
    .then(property => {
        console.log(property.id)
        res.render('property', {property, user: req.user})
    })
    .catch(next)

    let mailOptions = {
        from: 'realestateappproject2@gmail.com',
        to: req.user.email,
        subject: 'You listed a property!',
        html:
        '<body style="background-color: #004e92; height:150px;">' + '<div>' +'<h2 style="color:white;">You added a listing!</h2>' 
        + '<a href=https://blooming-fortress-96429.herokuapp.com/user/dashboard style="color:white;"' 
        + '>View your listings!</a>' + '</div>' + '</body>'
    }
    
    transporter.sendMail(mailOptions, (err, data) => {
        if(err) {
            console.log('Error', err)
        } else {
            console.log('Email sent')
        }
    })

})

//UPDATE
router.put('/:id', upload.single('img'), (req, res) => {
    console.log(req.body)
    console.log(`this is the id ${req.params.id}`)  
    const id = req.params.id
    let updateImg
    if(req.file != undefined) {
        updateImg = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
    }

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
            img: updateImg,
            description: req.body.description
        },
        { new: true },
        )
        .then(property => res.render('property', {property, user: req.user}))
        .catch(console.error)
})

router.delete('/:id', isLoggedIn, (req, res, next) => {
    const id = req.params.id
    Property.findOneAndDelete({_id: id})
    .then(() => {
        Property.find({})
        .then(properties => res.redirect('../user/dashboard'))
    })
    .catch(next)

    let mailOptions = {
        from: 'realestateappproject2@gmail.com',
        to: req.user.email,
        subject: 'You deleted a property!',
        html:
        '<body style="background-color: #004e92; height:150px;">' + '<div>' +'<h2 style="color:white;">You deleted a listing!</h2>' 
        + '<a href=https://blooming-fortress-96429.herokuapp.com/user/dashboard style="color:white;"' 
        + '>Add a new property!</a>' + '</div>' + '</body>'
    }
    
    transporter.sendMail(mailOptions, (err, data) => {
        if(err) {
            console.log('Error', err)
        } else {
            console.log('Email sent')
        }
    })
})

module.exports = router