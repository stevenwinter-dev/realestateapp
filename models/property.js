const mongoose = require('../db/connection')

const PropertySchema = new mongoose.Schema({
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    price: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    baths: { type: Number, required: true },
    imgURL: [{ type: String }],
    img: {data: Buffer, contentType: String},
    description: String,
    listedDate: { type: Date, default: Date.now }
}, { timestamps: true })

const Property = mongoose.model('Property', PropertySchema)

module.exports = Property