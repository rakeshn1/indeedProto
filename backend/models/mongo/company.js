const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  workScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  happinessScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  learningScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  appreciationScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  about: {
    type: String,
    required: true,
    maxlength: 1024,
  },
  name: {
    type: String,
    required: true,
    maxlength: 255,
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
    type: Object,
    required: true,
  },

  websiteURL: {
    type: String,
    maxlength: 1024,
  },
  photos: {
    type: [String],
  },
  logo: {
    type: String,
    maxlength: 1024,
  },
});

const Company = mongoose.model("Company", companySchema);
module.exports.companySchema = companySchema;
module.exports.Company = Company;
