const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize())
app.use(passport.session())

// passport.serializeUser((user, done) => {
//     done(null, user.id)
// })

app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.static(__dirname + '/public'))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('index.html')})

const propertyController = require('./controllers/propertyController')
app.use('/property', propertyController)

const userController = require('./controllers/userController')
const User = require('./models/user')
app.use('/user', userController)

app.set('port', process.env.PORT || 3000)



app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
})