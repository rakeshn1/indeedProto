const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
    maxlength: 255,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  industry: {
    type: String,
    maxlength: 255,
  },
  responsibilities: {
    type: String,
  },
  companyName: {
    type: String,
    maxlength: 255,
  },
  salary: {
    type: Number,
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  location: {
    type: Object,
    required: true,
  },
  jobType: {
    // FullTime: 0, PartTime: 1, Remote: 2
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 1,
  },
  datePosted: {
    type: Date,
    required: true,
  },
  totalApplicants: {
    type: Number,
  },
  numberOfSelectedApplicants: {
    type: Number,
  },
  numberOfRejectedApplicants: {
    type: Number,
  },
});

const Jobs = mongoose.model("Jobs", jobSchema);
module.exports.jobSchema = jobSchema;
module.exports.Jobs = Jobs;
