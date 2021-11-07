const mongoose = require('mongoose')
const addressSchema = new mongoose.Schema({
    address_line1: {
        type: String,
        required: true
    },
    address_line2: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    state: {
        type: String,
        default: null
    },
    zip: {
        type: Number,
        default: null
    }
}, { timestamps: true })

mongoose.model("Address", addressSchema)