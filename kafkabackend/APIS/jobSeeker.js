const { Reviews } = require("../models/review");
const Company = require("../models/company");
const { User } = require("../models/user")
const _ = require('lodash')

async function addReview(body, callback) {
  try {
    const review = new Reviews(body);
    await review.save();
    callback(null, "Added Review");
  } catch (ex) {
    console.log(ex);
    callback(ex, "Error");
  }
}

async function getJobSearchResults(body, callback) {
  try {
    console.log("body", body)

    callback(null, "Sent Results");
  } catch (ex) {
    console.log(ex);
    callback(ex, "Error");
  }
}

async function handleJobSaveUnsave(msg, callback) {

  let res = {};
  try {
    console.log("msg", msg)

    const userId = msg.params.userId;
    const jobId = msg.body.jobId;
    const jobSeeker = await User.findById(userId);


    console.log("JJ", jobSeeker);
    console.log("Job", jobId);

    const index = jobSeeker.savedJobs.indexOf(jobId)
    console.log("index", index)

    if (index === -1) {
      jobSeeker.savedJobs.push(jobId)
      await jobSeeker.save();
      console.log("added:", jobSeeker);
      res.data = "Added to saved jobs"
    }
    else {

      jobSeeker.savedJobs.splice(index, 1);
      await jobSeeker.save();
      console.log("removed:", jobSeeker);
      res.data = "Removed saved jobs"
    }

    console.log("JJ", jobSeeker);

    await jobSeeker.save()
    callback(null, res);
  } catch (err) {
    console.log("error", err);
    callback(err, "Error");
  }
}


handle_request = (msg, callback) => {
  if (msg.path === "addReview") {
    delete msg.path;
    console.log("Kafka side1");
    addReview(msg, callback);
  }

  if (msg.path === "getJobSearchResults") {
    delete msg.path;
    console.log("Kafka side1");
    getJobSearchResults(msg, callback);
  }

  if (msg.path === "jobSaveUnsave") {
    delete msg.path;
    console.log("Kafka side1 - HERE");
    handleJobSaveUnsave(msg, callback);
  }

};

exports.handle_request = handle_request;
