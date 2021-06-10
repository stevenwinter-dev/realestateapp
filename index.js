const express = require('express')
const app = express()

const methodOverride = require('method-override')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.use(methodOverride('_method'))


const propertyController = require('./controllers/propertyController')
app.use('/property', propertyController)

const userController = require('./controllers/userController')
app.use('/user', userController)

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
})