const { Reviews } = require("../models/review");
const { SalaryReview } = require("../models/salaryReview");
const { Company } = require("../models/company");

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

async function getJobSearchResults(body, callback) {
  try {
    console.log("body", body);

    callback(null, "Sent Results");
  } catch (ex) {
    console.log(ex);
    callback(ex, "Error");
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
    console.log("HERE");
    console.log("Kafka side1");
    getJobSearchResults(msg, callback);
  }
  if (msg.path === "addSalaryReview") {
    delete msg.path;
    console.log("HERE");
    console.log("Kafka side1");
    addSalaryReview(msg, callback);
  }
};

exports.handle_request = handle_request;
