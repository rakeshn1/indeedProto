const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const dishesSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    ingredients :{
        type:String,
        default:null
    },
    images:{
        type:String,
        default:null
    },
    price:{
        type:Number,
        default:null
    },
    description:{
        type:String,
        default:null
    },
    category :{
        type:Date,
        default:null 
    },
    restaurant_id:{
        type:ObjectId,
        ref:"Restaurant"
    },
    type:{
        type:String,
        default:null
    }
},{timestamps:true})

mongoose.model("Dishes",dishesSchema)