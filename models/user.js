const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    listings: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    }
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)

module.exports = User