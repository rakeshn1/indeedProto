const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const kafka = require("../kafka/client");
const { Jobs } = require("../models/mongo/jobs.js");
const { User } = require("../models/mongo/user");

router.post("/addReview", async (req, res) => {
  console.log(req.body);
  req.body.path = "addReview";
  kafka.make_request("jobSeeker-topic", req.body, function (err, results) {
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
  kafka.make_request("jobSeeker-topic", msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

router.get("/getSavedJobs/:userId", async (req, res) => {
  console.log("here", req.body);
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

  kafka.make_request("jobSeeker-topic", msg, function (err, results) {
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
  // kafka.make_request("jobSeeker-topic", req.body, function (err, results) {
  //   if (err) {
  //     return res.status(400).send(err);
  //   }
  //   console.log("BACKEND", results)
  //   return res.status(200).send(results);
  // });

  let response;
  if (!what && !where) {
    response = [];
  }
  else if (what && where) {
    response = await Jobs.find({
      $and:
        [
          {
            $or: [
              { "jobTitle": new RegExp('.*' + req.query.what + '.*', "i") },
              { "companyName": new RegExp('.*' + req.query.what + '.*', "i") }]
          },
          {
            $or: [
              { "location.city": new RegExp('.*' + req.query.where + '.*', "i") },
              { "location.country": new RegExp('.*' + req.query.where + '.*', "i") },
              { "location.state": new RegExp('.*' + req.query.where + '.*', "i") },
              { "location.zipcode": new RegExp('.*' + req.query.where + '.*', "i") }
            ]
          }
        ]
    })
  }
  else if (what && !where) {
    response = await Jobs.find({
      $or: [
        { "jobTitle": new RegExp('.*' + req.query.what + '.*', "i") },
        { "companyName": new RegExp('.*' + req.query.what + '.*', "i") }
      ]
    });
  }
  else {
    response = await Jobs.find({
      $or: [
        { "location.city": new RegExp('.*' + req.query.where + '.*', "i") },
        { "location.country": new RegExp('.*' + req.query.where + '.*', "i") },
        { "location.state": new RegExp('.*' + req.query.where + '.*', "i") },
        { "location.zipcode": new RegExp('.*' + req.query.where + '.*', "i") }
      ]
    })
  }
  console.log("response", response);
  res.send(response)
});


router.post("/applyJob", async (req, res) => {
  console.log(req.body);
  let msg = {};
  msg.body = req.body;
  msg.path = "applyJob";
  kafka.make_request("jobSeeker-topic", msg, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
});

module.exports = router;