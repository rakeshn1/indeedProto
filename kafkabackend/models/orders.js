const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const ordersSchema = new mongoose.Schema({
    status :{
        type:String,
        default:null
    },
    type :{
        type:String,
        default:null
    },
    customer_id:{
        type:ObjectId,
        ref:"Customer"
    },
    quantity:{
        type:Number,
        default:null
    },
    total:{
        type:Number,
        default:null
    },
    invoice_id:{
        type:String,
        default:null
    },
    restaurant_id:{
        type:ObjectId,
        ref:"Restaurant"
    },
    overall_status:{
        type:String,
        default:null
    },
    special_instructions:{
        type:String,
        default:null
    },
},{timestamps:true})

mongoose.model("Orders",ordersSchema)