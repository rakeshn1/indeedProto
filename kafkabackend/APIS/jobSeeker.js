const { Reviews } = require("../models/review");
const { User } = require("../models/user");
const _ = require("lodash");
const { SalaryReview } = require("../models/salaryReview");
const { Company } = require("../models/company");
const { JobApplication } = require("../models/jobApplications")

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

// jobSeekerId: "619f12eb7a93a10478dcae74",
//       companyId: "619ebb183ee1aa8bb08188a0",
//       isJobSeekerCurrentCompany: true,
//       jobTitle: "Software Engineer",
//       salary: 9000,
//       yearsOfReleventexperience: 5,
//       benefits: ["Benefit1", "Benefit2", "Benefit3"],

async function addSalaryReview(msg, callback) {
  const res = {};
  try {
    const salaryReview = new SalaryReview({
      jobSeekerId: msg.body.jobSeekerId,
      companyId: msg.body.companyId,
      isJobSeekerCurrentCompany: msg.body.isJobSeekerCurrentCompany,
      endDate: msg.body.endDate ? msg.body.endDate : undefined,
      jobTitle: msg.body.jobTitle,
      salary: msg.body.salary,
      yearsOfReleventexperience: msg.body.yearsOfReleventexperience,
      banefits: msg.body.benefits,
    });

    await salaryReview.save();
    res.status = 200;
    res.data = "Succesfullt added salaries review";
    callback(null, res);
  } catch (ex) {
    res.status = 500;
    res.data = ex;
    callback(null, res);
  }
}

async function applyJob(msg, callback) {
  const res = {};

  try {
    const jobApplication = new JobApplication({
      jobId: msg.body.jobId,
      userId: msg.body.userId,
      companyId: msg.body.companyId,
      resumeURL: msg.body.resumeURL,
      status: 1
    })

    await jobApplication.save();
    res.status = 200;
    res.data = "Succesfully applied to job";
    callback(null, res);
  }
  catch (err) {
    res.status = 500
    res.data = err
    callback(null, res)
  }
}


async function getJobSearchResults(body, callback) {
  try {
    console.log("body", body);

    callback(null, "Sent Results");
  } catch (ex) {
    console.log(ex);
    callback(ex, "Error");
  }
}

async function handleJobSaveUnsave(msg, callback) {
  let res = {};
  try {
    console.log("msg", msg);

    const userId = msg.params.userId;
    const jobId = msg.body.jobId;
    const jobSeeker = await User.findById(userId);

    console.log("JJ", jobSeeker);
    console.log("Job", jobId);

    const index = jobSeeker.savedJobs.indexOf(jobId);
    console.log("index", index);

    if (index === -1) {
      jobSeeker.savedJobs.push(jobId);
      await jobSeeker.save();
      console.log("added:", jobSeeker);
      res.data = "Added to saved jobs";
    } else {
      jobSeeker.savedJobs.splice(index, 1);
      await jobSeeker.save();
      console.log("removed:", jobSeeker);
      res.data = "Removed saved jobs";
    }

    console.log("JJ", jobSeeker);

    await jobSeeker.save();
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

  if (msg.path === "addSalaryReview") {
    delete msg.path;
    console.log("HERE");
    console.log("Kafka side1");
    addSalaryReview(msg, callback);
  }

  if (msg.path === "applyJob") {
    delete msg.path;
    console.log("apply job -reached kafka");
    applyJob(msg, callback)
  }
};

exports.handle_request = handle_request;
