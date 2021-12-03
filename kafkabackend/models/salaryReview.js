const mongoose = require("mongoose");

const salaryReviewSchema = new mongoose.Schema({
  jobSeekerId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  isJobSeekerCurrentCompany: {
    type: Boolean,
    require: true,
  },

  endDate: {
    type: String,
  },

  jobTitle: {
    type: String,
    required: true,
    maxlength: 255,
  },
  jobLocation: {
    type: String,
    required: true,
    maxlength: 255,
  },
  salary: {
    type: Number,
    required: true,
    min: 0,
  },
  yearsOfRelevantExperience: {
    type: Number,
    default: 0,
    min: 0,
  },

  benefits: {
    type: [String],
  },
});

const SalaryReview = mongoose.model("SalaryReview", salaryReviewSchema);
module.exports.salaryReviewSchema = salaryReviewSchema;
module.exports.SalaryReview = SalaryReview;
