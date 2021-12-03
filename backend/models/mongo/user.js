const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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
    type: String
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
  address: {
    type: Object,
  },
  companyRole: {
    type: String,
    maxlength: 255,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
      firstName: this.firstName,
      lastName: this.lastName,
    },
    "1234"
    // config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports.userSchema = userSchema;
module.exports.User = User;
