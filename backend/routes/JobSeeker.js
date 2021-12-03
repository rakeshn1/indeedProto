const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const kafka = require("../kafka/client");
const { Jobs } = require("../models/mongo/jobs.js");
const { User } = require("../models/mongo/user");
const { JobApplication } = require("../models/mongo/jobApplications");
const { Company } = require("../models/mongo/company");
const { Reviews } = require("../models/mongo/review");
const { response } = require("express");
const _ = require("lodash")

const topic = "jobSeeker-topic";

router.post("/addReview", async (req, res) => {
  console.log(req.body);
  req.body.path = "addReview";
  kafka.make_request(topic, req.body, function (err, results) {
    if (err) {
      return res.status(400).send(err);
    }

    return res.status(200).send(results);
  });
});

router.post("/addSalaryReview/", async (req, res) => {
  console.log(req.body);
  msg = {};
  msg.body = req.body;
  msg.path = "addSalaryReview";
  kafka.make_request(topic, msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

router.get("/getSavedJobs/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const response = await User.findById(userId);
    console.log("User Details", response.savedJobs);
    res.send(response.savedJobs);
  } catch (err) {
    console.log("error fetching user details", err);
    res.send(err);
  }
});

router.get("/getSavedJobsWithDesc/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const response = await User.findById(userId);
    console.log("User Details", response.savedJobs);

    result = [];
    await Promise.all(
      response.savedJobs.map(async (job) => {
        const jobData = await Jobs.findById(job._id);
        result.push(jobData);
      })
    );

    await Promise.all(
      result.map(async (jobData) => {
        const companyData = await Company.findById(jobData.companyId).select([
          "name",
          "logo",
        ]);
        jobData.companyName = companyData.name;
        jobData.companyLogo = companyData.logo;
        // res.data.push(jobData);
      })
    );

    res.send(result);
  } catch (err) {
    console.log("error fetching user details", err);
    res.send(err);
  }
});

router.get("/getAppliedJobs/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const response = await JobApplication.find({
      userId: mongoose.Types.ObjectId(userId),
    }).select("jobId");
    const result = [];
    response.map((job) => {
      result.push(job.jobId);
    });
    console.log("User Details", result);
    res.send(result);
  } catch (err) {
    console.log("error fetching user details", err);
    res.send(err);
  }
});

router.get("/getAppliedJobsWithDesc/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const response = await JobApplication.find({
      userId: mongoose.Types.ObjectId(userId),
    }).select("jobId");
    const result = [];
    response.map((job) => {
      result.push(job.jobId);
    });
    console.log("User Details", result);
    const jobsData = [];
    await Promise.all(
      result.map(async (job) => {
        const jobData = await Jobs.findById(job._id);
        jobsData.push(jobData);
      })
    );

    await Promise.all(
      jobsData.map(async (jobData) => {
        const companyData = await Company.findById(jobData.companyId).select([
          "name",
          "logo",
        ]);
        jobData.companyName = companyData.name;
        jobData.companyLogo = companyData.logo;
        // res.data.push(jobData);
      })
    );

    res.send(jobsData);
  } catch (err) {
    console.log("error fetching user details", err);
    res.send(err);
  }
});

router.get("/getJobSeekerDetails/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const response = await User.findOne({ _id: userId });
    console.log("User Details", response);
    res.send(response);
  } catch (err) {
    console.log("error fetching user details", err);
    res.send(err);
  }
});

router.put("/updateJobSeekerDetails/:userId", async (req, res) => {
  const userId = req.params.userId;
  const payload = req.body;

  console.log("PP", payload);
  try {
    const response = await User.findByIdAndUpdate(userId, payload, {
      useFindAndModify: true,
    });

    console.log("Updated User Details", response);
    res.send(response);
  } catch (err) {
    console.log("error updating user details", err);
    res.send(err);
  }
});
//   router.put("/updateResume/:userId", async (req, res) => {

//     const userId = req.params.userId;
//     const payload = req.body;

//     console.log("PP", payload)
//     try {

//       const response = await User.findByIdAndUpdate(userId, payload, { useFindAndModify: false });

//       console.log("Updated User Details", response)
//       res.send(response)
//     }
//     catch (err) {
//       console.log("error updating user details", err)
//       res.send(err)
//     }

// })

router.put("/handleJobSaveUnsave/:userId", async (req, res) => {
  let msg = {};
  msg.params = req.params;
  msg.body = req.body;
  msg.path = "jobSaveUnsave";

  console.log("MSG", msg);

  kafka.make_request(topic, msg, function (err, results) {
    if (err) {
      console.log("error in backend");
      return res.send(err);
    }
    console.log("results reached backend");
    return res.send(results);
  });
});

router.get("/getJobSearchResults/", async (req, res) => {
  console.log(req.query);
  // console.log(req)
  const what = req.query.what;
  const where = req.query.where;

  req.body.path = "getJobSearchResults";

  // res.status(200).send("All done here");
  // kafka.make_request(topic, req.body, function (err, results) {
  //   if (err) {
  //     return res.status(400).send(err);
  //   }
  //   console.log("BACKEND", results)
  //   return res.status(200).send(results);
  // });

  let companies = []
  let rr = []
  if (what) {
    rr = await Company.find({ name: { $regex: req.query.what, $options: "i" } }, { _id: 1 })
  }



  // response.map()
  console.log("CC", rr)

  rr?.map((r) => {
    companies.push(r._id)
  })

  let companyResponse = [];

  companyResponse = await Jobs.find({ "companyId": { $in: companies } }).lean()
  // console.log("JOBS OF COMPANIES: ", companyResponse)

  let response = []

  if (!what && !where) {
    response = [];
  } else if (what && where) {
    response = await Jobs.find({
      $and: [
        {
          $or: [
            { jobTitle: { $regex: req.query.what, $options: "i" } },
            { companyName: { $regex: req.query.what, $options: "i" } },
          ],
        },
        {
          $or: [
            {
              "location.city": { $regex: req.query.where, $options: "i" }
            },
            {
              "location.country": { $regex: req.query.where, $options: "i" }
            },
            {
              "location.state": { $regex: req.query.where, $options: "i" }
            },
            {
              "location.zipcode": { $regex: req.query.where, $options: "i" }
            },
          ],
        },
      ],
    }).lean();
  } else if (what && !where) {
    response = await Jobs.find({
      $or: [
        { jobTitle: { $regex: req.query.what, $options: "i" } },
        { companyName: { $regex: req.query.what, $options: "i" } },
      ],
    }).lean();
  } else {
    response = await Jobs.find({
      $or: [
        { "location.city": { $regex: req.query.where, $options: "i" } },
        { "location.country": { $regex: req.query.where, $options: "i" } },
        { "location.state": { $regex: req.query.where, $options: "i" } },
        { "location.zipcode": { $regex: req.query.where, $options: "i" } },
      ],
    }).lean();
  }

  await Promise.all(
    response.map(async (company) => {
      console.log("Company::::: ", company.companyId);
      const companyData = await Company.findById(
        company.companyId.toString()
      ).select("name");
      console.log("CompanyData: ", companyData);
      company.name = companyData.name;
      // res.data.push(company);
    })
  );

  await Promise.all(
    companyResponse.map(async (company) => {
      console.log("Company::::: ", company.companyId);
      const companyData = await Company.findById(
        company.companyId.toString()
      ).select("name");
      console.log("CompanyData: ", companyData);
      company.name = companyData.name;

      // res.data.push(company);
    })
  );

  await Promise.all(
    response.map(async (company) => {
      console.log("DFDHFJGKHL: ", company.companyId);
      const d = await Reviews.aggregate([
        {
          $match: {
            companyId: mongoose.Types.ObjectId(company.companyId.toString()),
          },
        },
        {
          $group: {
            _id: "$companyId",
            numberOfReviews: { $sum: 1 },
            averageRating: { $avg: "$rating" },
          },
        },
      ]);

      company.numberOfReviews = d.numberOfReviews ? d.numberOfReviews : 0;
      company.averageRating = d.averageRating ? d.averageRating : 0;
    })
  );

  await Promise.all(
    companyResponse.map(async (company) => {
      console.log("DFDHFJGKHL: ", company.companyId);
      const d = await Reviews.aggregate([
        {
          $match: {
            companyId: mongoose.Types.ObjectId(company.companyId.toString()),
          },
        },
        {
          $group: {
            _id: "$companyId",
            numberOfReviews: { $sum: 1 },
            averageRating: { $avg: "$rating" },
          },
        },
      ]);

      company.numberOfReviews = d.numberOfReviews ? d.numberOfReviews : 0;
      company.averageRating = d.averageRating ? d.averageRating : 0;
    })
  );

  let finalRes = [...response, ...companyResponse]



  finalRes = _.uniq(finalRes, (item) => {
    return item._id.toString()
  })
  // console.log("response", response, companyResponse);
  res.send(finalRes);
});

router.post("/applyJob", async (req, res) => {
  console.log(req.body);
  let msg = {};
  msg.body = req.body;
  msg.path = "applyJob";
  kafka.make_request(topic, msg, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
});

router.put("/updateReview/:id", async (req, res) => {
  req.body.path = "UpdateHelpfulnessScore";
  req.body.reviewId = req.params.id;
  kafka.make_request(topic, req.body, function (err, results) {
    if (err) {
      return res.status(400).send(err);
    }

    return res.status(200).send(results);
  });
});

router.get("/getReviews/:id", async (req, res) => {
  req.body.companyId = req.params.id;
  req.body.params = req.query;
  req.body.path = "getCompanyReviews";

  kafka.make_request(topic, req.body, function (err, results) {
    if (err) {
      return res.status(400).send(err);
    }

    return res.status(200).send(results);
  });
});

router.get("/getJobSeekerReviews/:id", async (req, res) => {
  req.body.jobSeekerId = req.params.id;
  req.body.params = req.query;
  req.body.path = "getJobSeekerReviews";

  kafka.make_request(topic, req.body, function (err, results) {
    res.status(results.status).send(results.data);
  });
});

router.get("/getRatings/:id", async (req, res) => {
  console.log("in get ratings");
  console.log(req.params.id);
  req.body.companyId = req.params.id;
  req.body.path = "getCompanyRatings";
  kafka.make_request(topic, req.body, function (err, results) {
    if (err) {
      return res.status(400).send(err);
    }

    return res.status(200).send(results);
  });
});

router.get("/getTotalReviews/:id", async (req, res) => {
  req.body.companyId = req.params.id;
  req.body.path = "getTotalReviews";
  kafka.make_request(topic, req.body, function (err, results) {
    if (err) {
      return res.status(400).send(err);
    }

    return res.status(200).send(results);
  });
});

module.exports = router;
