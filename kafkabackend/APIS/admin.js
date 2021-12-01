const { Company } = require("../models/company");
const { Jobs } = require("../models/jobs");
const { Reviews } = require("../models/review");
const { SalaryReview } = require("../models/salaryReview");
const { JobApplications } = require("../models/jobApplications");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const _ = require("lodash");

const getUnapprovedReviews = async (msg, callback) => {
  const res = {};

  try {
    const unapprovedReview = await Reviews.find({ status: 0 }).select([
      "review",
      "reviewSummary",
    ]);
    res.status = 200;
    res.data = unapprovedReview;
    callback(null, res);
  } catch (err) {
    res.status = 500;
    res.data = err;
    callback(null, res);
  }
};

const updateStatusOfReview = async (msg, callback) => {
  const res = {};
  console.log("msg", msg);
  try {
    const _id = msg.body.reviewId;
    const status = msg.body.status;

    const review = await Reviews.findById(_id);
    review.status = status;
    review.save();

    res.status = 200;
    res.data = "Updated successfully";

    callback(null, res);
  } catch (err) {
    res.status = 500;
    res.data = err;
    callback(null, res);
  }
};

const updateStatusOfPhoto = async (msg, callback) => {
  const res = {};
  try {
    const companyId = msg.body.companyId;
    const status = msg.body.status;
    const photoUrl = msg.body.photoUrl;
    console.log("STATUS:::: ", status);

    if (status === 1) {
      console.log("STATUS: 1");
      const company = await Company.findById(companyId);
      if (company.photos) {
        company.photos.push(photoUrl);
      } else {
        company.photos = [photoUrl];
      }
      console.log("company: ", company);
      await company.save();
    }

    // Delete from SQL
    res.status = 200;
    res.data = "Updated successfully";

    callback(null, res);
  } catch (err) {
    res.status = 500;
    res.data = err;
    callback(null, res);
  }
};

const getListOfAllReviewsExceptUnApproved = async (msg, callback) => {
  const res = {};
  try {
    const companyId = msg.params.companyId;
    const listOfReviews = await Reviews.find({
      status: { $ne: 0 },
      companyId: companyId,
    }).select(["review", "reviewSummary"]);
    res.status = 200;
    res.data = listOfReviews;
    callback(null, res);
  } catch (err) {
    res.status = 500;
    res.data = err;
    callback(null, res);
  }
};

const getJobStats = async (msg, callback) => {
  const res = {};
  try {
    res.data = [];
    const company_Id = msg.params.companyId;
    console.log("companyId: ", company_Id);
    let jobStats = [];
    jobStats = await JobApplications.aggregate([
      {
        $match: {
          companyId: mongoose.Types.ObjectId(company_Id),
        },
      },
      {
        $group: {
          _id: "$jobId",
          appliedCount: { $sum: 1 },
          hiredCount: { $sum: { $cond: [{ $eq: ["$status", 4] }, 1, 0] } },
          rejectedCount: { $sum: { $cond: [{ $eq: ["$status", 5] }, 1, 0] } },
        },
      },
    ]);

    console.log("jobStats: ", jobStats);

    await Promise.all(
      jobStats.map(async (job) => {
        const jobData = await Jobs.findById(job._id).select("jobTitle");
        job.jobTitle = jobData.jobTitle;
        res.data.push(job);
      })
    );

    res.status = 200;
    callback(null, res);
  } catch (err) {
    res.status = 500;
    res.data = err;
    callback(null, res);
  }
};

const numberOfReviewsPerDay = async (msg, callback) => {
  const res = {};
  try {
    const reviewsPerDay = await Reviews.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    res.status = 200;
    res.data = reviewsPerDay;
    callback(null, res);
  } catch (err) {
    res.status = 500;
    res.data = err;
    callback(null, res);
  }
};

const topfiveReviewedCompanies = async (msg, callback) => {
  const res = {};
  try {
    res.data = [];
    const topReviewedCompanies = await Reviews.aggregate([
      {
        $group: {
          _id: "$companyId",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    await Promise.all(
      topReviewedCompanies.map(async (company) => {
        const companyData = await Company.findById(company._id).select("name");
        company.name = companyData.name;
        res.data.push(company);
      })
    );

    res.status = 200;

    callback(null, res);
  } catch (err) {
    res.status = 500;
    res.data = err;
    callback(null, res);
  }
};

const topfiveJobSeekersBasedOnAcceptedReviews = async (msg, callback) => {
  const res = {};
  try {
    res.data = [];
    const topReviewers = await Reviews.aggregate([
      {
        $group: {
          _id: "$jobSeekerId",
          count: {
            $sum: {
              $cond: [
                { $or: [{ $eq: ["$status", 1] }, { $eq: ["$status", 2] }] },
                1,
                0,
              ],
            },
          },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    await Promise.all(
      topReviewers.map(async (jobSeeker) => {
        const jobSeekerData = await User.findById(jobSeeker._id).select([
          "email",
          "firstName",
          "lastName",
        ]);
        if (jobSeekerData) {
          jobSeeker.email = jobSeekerData.email;
          jobSeeker.firstName = jobSeekerData.firstName;
          jobSeeker.lastName = jobSeekerData.lastName;
          res.data.push(jobSeeker);
        }
      })
    );

    res.status = 200;

    callback(null, res);
  } catch (err) {
    res.status = 500;
    res.data = err;
    callback(null, res);
  }
};

const topTenCeosApproved = async (msg, callback) => {
  const res = {};
  try {
    res.data = [];
    let top10Ceos = [];
    top10Ceos = await Reviews.aggregate([
      {
        $group: {
          _id: "$companyId",
          approval: {
            $sum: { $cond: [{ $eq: ["$CEOApproval", true] }, 1, 0] },
          },
        },
      },
      { $sort: { approval: -1 } },
      { $limit: 10 },
    ]);

    console.log("top10Ceos: ", top10Ceos);

    await Promise.all(
      top10Ceos.map(async (company) => {
        const companyData = await Company.findById(company._id).select("ceo");
        company.ceo = companyData.ceo;
        res.data.push(company);
      })
    );

    res.status = 200;
    callback(null, res);
  } catch (err) {
    res.status = 500;
    res.data = err;
    callback(null, res);
  }
};

handle_request = (msg, callback) => {
  if (msg.path === "getUnapprovedReviews") {
    // delete msg.path;
    console.log("Kafka side1");
    getUnapprovedReviews(msg, callback);
  } else if (msg.path === "updateStatusOfReview") {
    // delete msg.path;
    console.log("Kafka side1");
    updateStatusOfReview(msg, callback);
  } else if (msg.path === "updateStatusOfPhoto") {
    // delete msg.path;
    console.log("Kafka side1");
    updateStatusOfPhoto(msg, callback);
  } else if (msg.path === "getListOfAllReviewsExceptUnApproved") {
    // delete msg.path;
    console.log("Kafka side1");
    getListOfAllReviewsExceptUnApproved(msg, callback);
  } else if (msg.path === "getJobStats") {
    // delete msg.path;
    console.log("Kafka side1");
    getJobStats(msg, callback);
  } else if (msg.path === "numberOfReviewsPerDay") {
    // delete msg.path;
    console.log("Kafka side1");
    numberOfReviewsPerDay(msg, callback);
  } else if (msg.path === "topfiveReviewedCompanies") {
    // delete msg.path;
    console.log("Kafka side1");
    topfiveReviewedCompanies(msg, callback);
  } else if (msg.path === "topfiveJobSeekersBasedOnAcceptedReviews") {
    // delete msg.path;
    console.log("Kafka side1");
    topfiveJobSeekersBasedOnAcceptedReviews(msg, callback);
  } else if (msg.path === "topTenCeosApproved") {
    // delete msg.path;
    console.log("Kafka side1");
    topTenCeosApproved(msg, callback);
  }
};

exports.handle_request = handle_request;
