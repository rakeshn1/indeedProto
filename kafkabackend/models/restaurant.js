const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    phone_number: {
        type: String,
        default: null
    },
    from_time: {
        type: Date,
        default: null
    },
    to_time: {
        type: Date,
        default: null
    },
    pictures: {
        type: String,
        default: null
    },
    is_pickup: {
        type: Number,
        default: 0
    },
    is_delivery: {
        type: Number,
        default: 0
    },
    favourited_by: {
        type: [ObjectId],
        ref: "Customer"
    },
}, { timestamps: true })

module.exports = mongoose.model("Restaurant", restaurantSchema)