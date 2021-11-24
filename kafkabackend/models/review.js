const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  jobSeekerId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  rating: {
    type: Number,
    minLength: 0,
    maxlength: 5,
    required: true,
  },
  workLifeBal: Number,
  jobSecurity: Number,
  management: Number,
  culture: Number,
  benefits: Number,
  reviewSummary: {
    type: String,
    required: true,
    maxlength: 255,
  },
  review: {
    type: String,
    required: true,
    maxlength: 1024,
  },
  pros: {
    type: String,
    required: true,
    maxlength: 1024,
  },
  cons: {
    type: String,
    required: true,
    maxlength: 1024,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    required: true,
  },
  CEOApproval: {
    type: Boolean,
    required: true,
  },
  howShouldIPrepare: {
    type: String,
    maxlength: 1024,
  },
  helpfulnessScore: {
    type: Object
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    // Unapproved: 0, Approved: 1, Featured: 2, Disapproved:3
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 1,
  },
  isFeatured: {
    type: Boolean,
  },
});


const Reviews = mongoose.model("Review", reviewSchema);
module.exports.reviewSchema = reviewSchema
module.exports.Reviews = Reviews

