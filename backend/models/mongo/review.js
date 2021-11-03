const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    jobSeekerId: {
        type: mongoose.Schema.Types.ObjectId
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId
    },
    rating: {
        type: Number,
        minLength: 0,
        maxlength: 5
    },
    reviewSummary: {
        type: String,
        required: true,
        maxlength: 255
    },
    review: {
        type: String,
        required: true,
        maxlength: 1024
    },
    pros: {
        type: String,
        required: true,
        maxlength: 1024
    },
    cons: {
        type: String,
        required: true,
        maxlength: 1024
    },
    CEOApproval: {
        type: Boolean,
        required: true
    },
    howShouldIPrepare: {
        type: String,
        maxlength: 1024
    },
    helpfulnessScore: {
        type: new mongoose.Schema({
            yesCount: {
                type: Number,
                default: 0
            },
            noCount: {
                type: Number,
                default: 0
            }
        })
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        // Unapproved: 0, Approved: 1, Featured: 2, Disapproved:3
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 1
    }

})

const Review = mongoose.model("Review", reviewSchema);
module.exports.reviewSchema = reviewSchema
module.exports.Review = Review