const { Reviews } = require("../models/review");
const { User } = require("../models/user");
const _ = require("lodash");
const { SalaryReview } = require("../models/salaryReview");
const { Company } = require("../models/company");
const { JobApplication } = require("../models/jobApplications");
const mongoose = require("mongoose");

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

async function updateReview(body, callback) {
  try {
    console.log("reviewId", body.reviewId);
    let review = await Reviews.findById(body.reviewId);
    if (body.isHelpful) {
      review.helpfulnessScore.yesCount = review.helpfulnessScore.yesCount + 1;
    } else {
      review.helpfulnessScore.noCount = review.helpfulnessScore.noCount + 1;
    }
    await review.save();
    callback(null, "updated review");
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
      benefits: msg.body.benefits,
      jobLocation: msg.body.jobLocation,
    });

    await salaryReview.save();
    res.status = 200;
    res.data = "Succesfully added salaries review";
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
      coverLetterURL: msg.body.coverLetterURL,
      status: 1,
    });

    await jobApplication.save();
    res.status = 200;
    res.data = "Succesfully applied to job";
    callback(null, res);
  } catch (err) {
    res.status = 500;
    res.data = err;
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

async function getJobSeekerReviews(msg, callback) {
  const res = {};
  try {
    res.data = [];
    const result = await Reviews.find({
      jobSeekerId: mongoose.Types.ObjectId(msg.jobSeekerId),
    }).lean();

    const data = [];

    await Promise.all(
      result.map(async (jobData) => {
        const companyData = await Company.findById(jobData.companyId).select([
          "name",
          "logo",
        ]);

        jobData["companyName"] = companyData.name;
        jobData["companyLogo"] = companyData.logo;

        data.push(jobData);
      })
    );

    res.status = 200;
    res.data = data;
    callback(null, res);
  } catch (err) {
    res.status = 500;
    res.data = err;
    callback(null, res);
  }
}

async function getTotalNumberOfReviews(body, callback) {
  try {
    console.log("in total no of reviews");

    filterprops = {
      status: { $in: [1, 2] },
      companyId: body.companyId,
    };
    totalDocs = await Reviews.find(filterprops).count();

    callback(null, totalDocs.toString());
  } catch (ex) {
    console.log(ex);
    callback(ex, "Error");
  }
}
async function getUserReviews(body, callback) {
  try {
    console.log("in user reviews");
    let userReviews = [];
    filterprops = {
      status: { $in: [1, 2] },
      companyId: body.companyId,
    };
    let reviews = await Reviews.find(filterprops);
    userReviews = reviews.filter(
      (rev) => rev.jobSeekerId == body.params.jobSeekerId
    );
    let othereviews = reviews.filter(
      (rev) => rev.jobSeekerId != body.params.jobSeekerId
    );
    console.log("userReviews", userReviews);
    console.log("othereviews", othereviews);
    userReviews = userReviews.concat(othereviews);
    let pageNo = body.params.pageNo == undefined ? 1 : body.params.pageNo;
    let limit = 5;
    let skip = (pageNo - 1) * limit;
    let results = [];
    for (let i = skip; i < skip + limit && i < userReviews.length; i++) {
      results.push(userReviews[i]);
    }

    callback(null, { reviews: results });
  } catch (ex) {
    callback(ex, "Error");
  }
}

async function getFeaturedReviews(body, callback) {
  try {
    console.log("getFeaturedReviews");
    let results = [];
    let featuredReviews = [];
    filterprops = {
      status: { $in: [1, 2] },
      companyId: body.companyId,
    };
    let reviews = await Reviews.find(filterprops);
    console.log("featured reviews");
    featuredReviews = reviews.filter((rev) => rev.status == 2);
    if (featuredReviews.length >= 5) {
      results.push(featuredReviews[0]);
      results.push(featuredReviews[1]);
      results.push(featuredReviews[2]);
      results.push(featuredReviews[3]);
    }
    let otherReviews = reviews
      .filter((rev) => rev.status == 1)
      .sort((r1, r2) => r1.rating - r2.rating);
    let len = 0;
    while (featuredReviews.length <= 5 && len < otherReviews.length) {
      featuredReviews.push(otherReviews[len]);
      len++;
    }
    callback(null, { reviews: featuredReviews });
  } catch (ex) {
    callback(ex, "Error");
  }
}

async function getCompanyReviews(body, callback) {
  try {
    let sortprops = {};
    let filterprops = {};

    if (body.params?.isFeatured) {
      return getFeaturedReviews(body, callback);
    } else if (body.params?.jobSeekerId) {
      return getUserReviews(body, callback);
    } else {
      filterprops = {
        status: { $in: [1, 2] },
        companyId: body.companyId,
      };
    }
    console.log("in main reviews function");

    let filteredKey;
    if (body.params?.filter) {
      filteredKey = JSON.parse(body.params?.filter);
      console.log(filteredKey);
      if (filteredKey?.rating) filterprops.rating = Number(filteredKey?.rating);
      if (filteredKey.date) {
        if (filteredKey.date == "Last_Week") {
          filterprops.date = {
            $lte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
            $gte: new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000),
          };
        } else if (filteredKey.date == "Last_Month") {
          monthData = new Date();
          let start = `2021-${monthData.getMonth()}-01`;
          let end = `2021-${monthData.getMonth() + 1}-01`;
          filterprops.date = {
            $lte: end,
            $gte: start,
          };
        } else if (filteredKey.date == "This_Month") {
          monthData = new Date();
          monthData.setMonth(monthData.getMonth());
          console.log(monthData.getMonth());
          let start = `2021-${monthData.getMonth() + 1}-01`;
          filterprops.date = {
            $gte: start,
            $lte: new Date(),
          };
        } else if (filteredKey.date == "This_Week") {
          filterprops.date = {
            $lte: new Date(),
            $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
          };
        }
      }
    }

    if (body.params?.sortBy) {
      sortprops[body.params.sortBy] = -1;
    } else {
      sortprops.date = -1;
    }

    let pageNo = body.params.pageNo == undefined ? 1 : body.params.pageNo;
    let limit = 5;
    let skip = (pageNo - 1) * limit;

    console.log("filterprops", filterprops);
    console.log("sortprops", sortprops);
    let totalDocs = await Reviews.find(filterprops).sort(sortprops).count();
    let reviews = await Reviews.find(filterprops)
      .sort(sortprops)
      .skip(skip)
      .limit(limit);

    callback(null, { reviews: reviews, totalDocs: totalDocs });
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

getCompanyrating = async (body, callback) => {
  try {
    filterprops = {
      status: { $in: [1, 2] },
      companyId: body.companyId,
    };
    let reviews = await Reviews.find(filterprops);
    let sum = 0;
    reviews.forEach((rev) => (sum += rev.rating));
    let rating = Math.round(sum / reviews.length);
    callback(null, rating.toString());
  } catch (err) {
    console.log("error", err);
    callback(err, "Error");
  }
};

getSalaryReview = async (msg, callback) => {
  try {
    const queryObject = { companyId: msg.companyId };
    if (msg.query.jobTitle) queryObject.jobTitle = msg.query.jobTitle;
    if (msg.query.jobLocation) queryObject.jobLocation = msg.query.jobLocation;
    console.log("in get salary review", queryObject);
    const salaryReviews = await SalaryReview.find(queryObject);
    callback([], salaryReviews);
  } catch (err) {
    console.log("error", err);
    callback(err, "Error");
  }
};

getSalaryReviewJobLocations = async (msg, callback) => {
  try {
    const queryObject = { companyId: msg.companyId };
    if (msg.query.jobTitle) queryObject.jobTitle = msg.query.jobTitle;
    console.log("in get salary review - jobLocations", queryObject);
    const jobLocations = await SalaryReview.distinct('jobLocation', queryObject)
    callback([], jobLocations);
  } catch (err) {
    console.log("error", err);
    callback(err, "Error");
  }
};

getSalaryReviewJobTitles = async (msg, callback) => {
  try {
    const queryObject = { companyId: msg.companyId };
    if (msg.query.jobLocation) queryObject.jobLocation = msg.query.jobLocation;
    console.log("in get salary review - job titles", queryObject);
    const jobTitles = await SalaryReview.distinct('jobTitle', queryObject)
    callback([], jobTitles);
  } catch (err) {
    console.log("error", err);
    callback(err, "Error");
  }
};

handle_request = (msg, callback) => {
  if (msg.path === "addReview") {
    delete msg.path;
    console.log("Kafka side1");
    addReview(msg, callback);
  } else if (msg.path === "getJobSearchResults") {
    delete msg.path;
    console.log("Kafka side1");
    getJobSearchResults(msg, callback);
  } else if (msg.path === "UpdateHelpfulnessScore") {
    delete msg.path;
    updateReview(msg, callback);
  } else if (msg.path === "getCompanyReviews") {
    delete msg.path;
    getCompanyReviews(msg, callback);
  } else if (msg.path === "jobSaveUnsave") {
    delete msg.path;
    console.log("Kafka side1 - HERE");
    handleJobSaveUnsave(msg, callback);
  } else if (msg.path === "addSalaryReview") {
    delete msg.path;
    console.log("HERE");
    console.log("Kafka side1");
    addSalaryReview(msg, callback);
  } else if (msg.path === "applyJob") {
    delete msg.path;
    console.log("apply job -reached kafka");
    applyJob(msg, callback);
  } else if (msg.path === "getJobSeekerReviews") {
    delete msg.path;
    console.log("apply job -reached kafka");
    getJobSeekerReviews(msg, callback);
  } else if (msg.path === "getCompanyRatings") {
    delete msg.path;
    getCompanyrating(msg, callback);
  } else if (msg.path === "getTotalReviews") {
    delete msg.path;
    getTotalNumberOfReviews(msg, callback);
  } else if (msg.path === "getSalaryReviews") {
    delete msg.path;
    getSalaryReview(msg, callback);
  } else if (msg.path === "getSalaryReviews-JobTitles") {
    delete msg.path;
    getSalaryReviewJobTitles(msg, callback);
  } else if (msg.path === "getSalaryReviews-JobLocations") {
    delete msg.path;
    getSalaryReviewJobLocations(msg, callback);
  }
};

exports.handle_request = handle_request;
