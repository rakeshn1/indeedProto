const { Company } = require("../models/company");
const { Jobs } = require("../models/jobs");
const { Reviews } = require("../models/review");
const { SalaryReview } = require("../models/salaryReview");
const _ = require("lodash");

const getCompanyNamesAndJobTitles = async (msg, callback) => {
  const res = {};
  try {
    msg.term = msg.term.toLowerCase();
    console.log("msg.term: ", msg.term);
    console.log("In getCompanyNamesAndJobTitles");
    res.data = [];
    const companyResults = await Company.find({}).select("name");
    const jobResults = await Jobs.find({}).select("jobTitle");

    companyResults.forEach((company) => {
      if (company.name.toLowerCase().startsWith(msg.term)) {
        res.data.push(company.name);
      }
    });
    jobResults.forEach((job) => {
      if (job.jobTitle.toLowerCase().startsWith(msg.term)) {
        res.data.push(job.jobTitle);
      }
    });
    res.data = _.uniq(res.data);
    res.status = 200;
    callback(null, res);
  } catch (err) {
    res.status = 400;
    res.data = err;
    callback(null, res);
  }
};

const getCompanyNames = async (msg, callback) => {
  const res = {};
  try {
    msg.term = msg.term.toLowerCase();
    console.log("msg.term: ", msg.term);
    console.log("In getCompanyNames");
    res.data = [];
    const companyResults = await Company.find({}).select("name");

    companyResults.forEach((company) => {
      if (company.name.toLowerCase().startsWith(msg.term)) {
        res.data.push(company.name);
      }
    });

    res.data = _.uniq(res.data);
    res.status = 200;
    callback(null, res);
  } catch (err) {
    res.status = 400;
    res.data = err;
    callback(null, res);
  }
};

const getJobTitles = async (msg, callback) => {
  const res = {};
  try {
    msg.term = msg.term.toLowerCase();
    console.log("msg.term: ", msg.term);
    console.log("In getJobTitles");
    res.data = [];
    const jobResults = await Jobs.find({}).select("jobTitle");

    jobResults.forEach((job) => {
      if (job.jobTitle.toLowerCase().startsWith(msg.term)) {
        res.data.push(job.jobTitle);
      }
    });

    res.data = _.uniq(res.data);
    res.status = 200;
    callback(null, res);
  } catch (err) {
    res.status = 400;
    res.data = err;
    callback(null, res);
  }
};

const getLocations = async (msg, callback) => {
  const res = {};
  try {
    msg.term = msg.term.toLowerCase();
    console.log("msg.term: ", msg.term);
    console.log("In getLocation");
    res.data = [];
    const companyResults = await Company.find({}).select("headQuarters");
    const jobResults = await Jobs.find({}).select("location");

    companyResults.forEach((company) => {
      if (company.headQuarters.city.toLowerCase().startsWith(msg.term)) {
        res.data.push(company.headQuarters.city);
      }
      if (company.headQuarters.state.toLowerCase().startsWith(msg.term)) {
        res.data.push(company.headQuarters.state);
      }
      if (company.headQuarters.country.toLowerCase().startsWith(msg.term)) {
        res.data.push(company.headQuarters.country);
      }
    });
    jobResults.forEach((job) => {
      if (job.location.city.toLowerCase().startsWith(msg.term)) {
        res.data.push(job.location.city);
      }
      if (job.location.state.toLowerCase().startsWith(msg.term)) {
        res.data.push(job.location.state);
      }
      if (job.location.country.toLowerCase().startsWith(msg.term)) {
        res.data.push(job.location.country);
      }
    });
    res.data = _.uniq(res.data);
    res.status = 200;
    callback(null, res);
  } catch (err) {
    res.status = 400;
    res.data = err;
    callback(null, res);
  }
};

const getReviews = async (msg, callback) => {
  const res = {};
  console.log("------------------------------------------------");
  console.log("msg.companyNameOrJobTitle: ", msg.companyNameOrJobTitle);
  console.log("msg.location: ", msg.location);
  console.log("------------------------------------------------");
  try {
    let selectedCompanyIds = [];
    res.data = [];
    if (msg.companyNameOrJobTitle && msg.location) {
      console.log("-----BOTH PRESENT-------");
      msg.companyNameOrJobTitle = msg.companyNameOrJobTitle.toLowerCase();
      msg.location = msg.location.toLowerCase();
      console.log("In getReviews");

      const companyResults = await Company.find({}).select([
        "name",
        "headQuarters",
      ]);

      companyResults.forEach((company) => {
        if (
          company.name.toLowerCase().startsWith(msg.companyNameOrJobTitle) &&
          (company.headQuarters.city.toLowerCase().startsWith(msg.location) ||
            company.headQuarters.state.toLowerCase().startsWith(msg.location) ||
            company.headQuarters.country.toLowerCase().startsWith(msg.location))
        ) {
          selectedCompanyIds.push(company._id);
        }
      });

      reviews = await Reviews.find({
        companyId: { $nin: selectedCompanyIds },
      });

      reviews.forEach((review) => {
        if (
          review.jobTitle.toLowerCase().startsWith(msg.companyNameOrJobTitle) &&
          review.jobLocation.toLowerCase().startsWith(msg.location)
        ) {
          selectedCompanyIds.push(review.companyId);
        }
      });
    } else if (msg.companyNameOrJobTitle) {
      console.log("-------ONLY COMPANIES-----------");
      msg.companyNameOrJobTitle = msg.companyNameOrJobTitle.toLowerCase();
      console.log("In only companyName: ", msg.companyNameOrJobTitle);
      res.data = [];

      const companyResults = await Company.find({}).select(["name"]);

      companyResults.forEach((company) => {
        if (company.name.toLowerCase().startsWith(msg.companyNameOrJobTitle)) {
          selectedCompanyIds.push(company._id);
        }
      });

      console.log("First selectedCompanyIds: ", selectedCompanyIds);

      reviews = await Reviews.find({
        companyId: { $nin: selectedCompanyIds },
      });

      reviews.forEach((review) => {
        if (
          review.jobTitle.toLowerCase().startsWith(msg.companyNameOrJobTitle)
        ) {
          selectedCompanyIds.push(review.companyId);
        }
      });
      console.log("Second selectedCompanyIds: ", selectedCompanyIds);
    } else if (msg.location) {
      console.log("----------ONLY LOCATION------------");
      msg.location = msg.location.toLowerCase();
      console.log("In getReviews");
      res.data = [];

      const companyResults = await Company.find({}).select(["headQuarters"]);

      companyResults.forEach((company) => {
        if (
          company.headQuarters.city.toLowerCase().startsWith(msg.location) ||
          company.headQuarters.state.toLowerCase().startsWith(msg.location) ||
          company.headQuarters.country.toLowerCase().startsWith(msg.location)
        ) {
          selectedCompanyIds.push(company._id);
        }
      });

      reviews = await Reviews.find({
        companyId: { $nin: selectedCompanyIds },
      });

      reviews.forEach((review) => {
        if (review.jobLocation.toLowerCase().startsWith(msg.location)) {
          selectedCompanyIds.push(review.companyId);
        }
      });
    } else {
      console.log("------NONE-------");
      let companyRatings = [];
      companyRatings = await Reviews.aggregate([
        {
          $group: {
            _id: "$companyId",
            rating: { $avg: "$rating" },
          },
        },
      ]);
      console.log("companyRating: ", companyRatings);

      await Promise.all(
        companyRatings.map(async (comp) => {
          console.log("companyId: ", comp);
          const company = {};
          company._id = comp._id;

          company.rating = comp.rating;

          const response = await Company.findById(comp._id).select([
            "name",
            "mission",
            "logo",
          ]);

          company.name = response.name;
          company.mission = response.mission;
          company.logo = response.logo;
          // console.log("company: ", company);
          res.data.push(company);
        })
      );
      res.status = 200;
      callback(null, res);
    }

    selectedCompanyIds = _.uniq(selectedCompanyIds);

    let companyRatings = [];
    companyRatings = await Reviews.aggregate([
      {
        $group: {
          _id: "$companyId",
          rating: { $avg: "$rating" },
        },
      },
    ]);
    console.log("companyRating: ", companyRatings);

    await Promise.all(
      selectedCompanyIds.map(async (companyId) => {
        console.log("companyId: ", companyId);
        const company = {};
        company._id = companyId;

        const compData = _.find(companyRatings, {
          _id: companyId,
        });

        if (compData) {
          company.rating = compData.rating;
        } else {
          company.rating = 0;
        }

        const response = await Company.findById(companyId).select([
          "name",
          "mission",
          "logo",
        ]);

        company.name = response.name;
        company.mission = response.mission;
        company.logo = response.logo;
        // console.log("company: ", company);
        res.data.push(company);
      })
    );

    // console.log("res.data: ", res.data);
    res.status = 200;
    callback(null, res);
  } catch (err) {
    res.status = 400;
    res.data = err;
    callback(null, res);
  }
};

const getSalaryReviewsMainData = async (msg, callback) => {
  res = {};
  try {
    // companyRatings = await Reviews.aggregate([
    //   {
    //     $group: {
    //       _id: "$companyId",
    //       rating: { $avg: "$rating" },
    //     },
    //   },
    // ]);

    console.log(msg.jobTitle, msg.location);
    msg.jobTitle = msg.jobTitle.toLowerCase();
    msg.location = msg.location.toLowerCase();

    selectedCompanyIds = [];
    const companyResults = await Company.find({}).select(["headQuarters"]);

    companyResults.forEach((company) => {
      if (
        company.headQuarters.city.toLowerCase().startsWith(msg.location) ||
        company.headQuarters.state.toLowerCase().startsWith(msg.location) ||
        company.headQuarters.country.toLowerCase().startsWith(msg.location)
      ) {
        selectedCompanyIds.push(company._id);
      }
    });

    console.log("selectedCompanyIds: ", selectedCompanyIds);

    const result = await SalaryReview.aggregate([
      {
        $match: {
          jobTitle: { $regex: msg.jobTitle, $options: "i" },
          companyId: { $in: selectedCompanyIds },
        },
      },
      {
        $group: {
          _id: "$jobTitle",
          // rating: { $avg: "$rating" },
          numberOfReviews: { $sum: 1 },
          averageSalary: { $avg: "$salary" },
        },
      },
    ]);
    console.log("result: ", result);
    res.status = 200;
    res.data = result;
    callback(null, res);
  } catch (ex) {
    res.status = 500;
    res.data = ex;
    callback(null, res);
  }
};

const getSalaryReviewsRankedJobs = async (msg, callback) => {
  res = {};
  res.data = [];
  try {
    // companyRatings = await Reviews.aggregate([
    //   {
    //     $group: {
    //       _id: "$companyId",
    //       rating: { $avg: "$rating" },
    //     },
    //   },
    // ]);

    console.log(msg.jobTitle, msg.location);
    msg.jobTitle = msg.jobTitle.toLowerCase();
    msg.location = msg.location.toLowerCase();

    selectedCompanyIds = [];
    const companyResults = await Company.find({}).select(["headQuarters"]);

    companyResults.forEach((company) => {
      if (
        company.headQuarters.city.toLowerCase().startsWith(msg.location) ||
        company.headQuarters.state.toLowerCase().startsWith(msg.location) ||
        company.headQuarters.country.toLowerCase().startsWith(msg.location)
      ) {
        selectedCompanyIds.push(company._id);
      }
    });

    console.log("selectedCompanyIds: ", selectedCompanyIds);

    const result = await SalaryReview.aggregate([
      {
        $match: {
          jobTitle: { $regex: msg.jobTitle, $options: "i" },
          companyId: { $in: selectedCompanyIds },
        },
      },
      {
        $group: {
          _id: "$companyId",
          // rating: { $avg: "$rating" },
          numberOfSalaryReviews: { $sum: 1 },
          averageSalary: { $avg: "$salary" },
        },
      },
      { $sort: { averageSalary: 1 } },
      { $limit: 5 },
    ]);

    console.log("result: ", result);

    await Promise.all(
      result.map(async (company) => {
        console.log("company: ", company);
        const resu = await Company.findById(company._id).select(["name"]);
        company.name = resu.name;
        const ratingData = await Reviews.aggregate([
          {
            $match: {
              companyId: company._id,
            },
          },
          {
            $group: {
              _id: "$companyId",
              numberOfReviews: { $sum: 1 },
              rating: { $avg: "$rating" },
            },
          },
        ]);
        // console.log("ratingData: ", ratingData, "======");
        if (ratingData.length > 0) {
          company.numberOfReviews = ratingData[0].numberOfReviews;
          company.rating = ratingData[0].rating;
        }
        res.data.push(company);
        console.log("company: ", company);
      })
    );

    res.data = _.orderBy(res.data, ["averageSalary"], ["desc"]);

    res.status = 200;

    callback(null, res);
  } catch (ex) {
    res.status = 500;
    res.data = ex;
    callback(null, res);
  }
};

handle_request = (msg, callback) => {
  if (msg.path === "getCompanyNamesAndJobTitles") {
    // delete msg.path;
    console.log("Kafka side1");
    getCompanyNamesAndJobTitles(msg, callback);
  }
  if (msg.path === "getCompanyNames") {
    // delete msg.path;
    console.log("Kafka side1");
    getCompanyNames(msg, callback);
  }
  if (msg.path === "getJobTitles") {
    // delete msg.path;
    console.log("Kafka side1");
    getJobTitles(msg, callback);
  }
  if (msg.path === "getLocations") {
    // delete msg.path;
    console.log("Kafka side1");
    getLocations(msg, callback);
  }
  if (msg.path === "getReviews") {
    // delete msg.path;
    console.log("Kafka side1");
    getReviews(msg, callback);
  }
  if (msg.path === "getSalaryReviewsMainData") {
    // delete msg.path;
    console.log("Kafka side1");
    getSalaryReviewsMainData(msg, callback);
  }
  if (msg.path === "getSalaryReviewsRankedJobs") {
    // delete msg.path;
    console.log("Kafka side1");
    getSalaryReviewsRankedJobs(msg, callback);
  }
};

exports.handle_request = handle_request;
