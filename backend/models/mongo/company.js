const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  workScore: {
    type: Number,
    min: 0,
    max: 10,
  },
  happinessScore: {
    type: Number,
    min: 0,
    max: 10,
  },
  learningScore: {
    type: Number,
    min: 0,
    max: 10,
  },
  appreciationScore: {
    type: Number,
    min: 0,
    max: 10,
  },
  about: {
    type: String,
    required: true,
    maxlength: 1024,
  },
  ceo: {
    type: String,
    required: true,
    maxlength: 255,
  },
  founded: {
    type: String,
    required: true,
    maxlength: 255,
  },
  companySize: {
    type: Number,
  },
  revenue: {
    type: Number,
    minLength: 0,
    maxlength: 5,
  },
  industry: {
    type: String,
    required: true,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    maxlength: 255,
  },
  mission: {
    type: String,
    required: true,
    maxlength: 255,
  },
  values: {
    type: String,
    required: true,
    maxlength: 255,
  },

  workCulture: {
    type: String,
    required: true,
    maxlength: 255,
  },

  vision: {
    type: String,
    required: true,
    maxlength: 255,
  },

  companyType: {
    type: String,
    required: true,
    maxlength: 255,
  },
  headQuarters: {
    type: new mongoose.Schema({
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
    }),
  },
  websiteURL: {
    type: String,
    maxlength: 1024,
  },
  photos: {
    type: [String],
  },
  companyLogo: {
    type: String,
    maxlength: 1024,
  },
});

const Company = mongoose.model("Company", companySchema);
module.exports.companySchema = companySchema;
module.exports.Company = Company;
