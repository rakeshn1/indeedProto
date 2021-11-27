const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  role: {
    // Admin: 0, Employer: 1, JobSeeker: 2
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 1,
  },
  firstName: {
    type: String,
    maxlength: 255,
  },
  lastName: {
    type: String,
    maxlength: 255,
  },
  phoneNumber: {
    type: String,
    minlength: 10,
    maxlength: 12,
  },
  savedJobs: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  resume: {
    type: String,
    maxlength: 1024,
  },
  coverLetter: {
    type: String,
    maxlength: 1024,
  },
});

const User = mongoose.model("User", userSchema);
module.exports.userSchema = userSchema;
module.exports.User = User;
