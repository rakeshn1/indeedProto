const mongoose = require('mongoose')
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String,
        default: null
    },
    about: {
        type: String,
        default: null
    },
    dob: {
        type: Date,
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
    country: {
        type: String,
        default: null
    },
    nick_name: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        default: null
    }
}, { timestamps: true })

module.exports = mongoose.model("Customer", customerSchema)