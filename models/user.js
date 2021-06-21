const mongoose = require('../db/connection')

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
    favorites: [String]
}, { timestamps: true })

UserSchema.path('email').validate(async (email) => {
    const emailCount = await mongoose.models.User.countDocuments({email})
    return !emailCount
}, 'Email already exists' )

const User = mongoose.model('User', UserSchema)

module.exports = User