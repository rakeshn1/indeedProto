const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const orderDetailsSchema = new mongoose.Schema({
    invoice_id: {
        type: String,
        default: null
    },
    dish_id: {
        type: ObjectId,
        ref: "Dishes"
    },
    price: {
        type: Number,
        default: null
    },
    quantity: {
        type: Number,
        default: null
    },
    total: {
        type: Number,
        default: null
    },
}, { timestamps: true })

mongoose.model("OrderDetails", orderDetailsSchema)