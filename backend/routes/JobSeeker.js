const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const kafka = require("../kafka/client");
const { Jobs } = require("../models/mongo/jobs.js");

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

router.get("/getJobSearchResults/", async (req, res) => {
  console.log(req.query);
  // console.log(req)

  req.body.path = "getJobSearchResults";

  // res.status(200).send("All done here");
  // kafka.make_request("jobSeeker-topic", req.body, function (err, results) {
  //   if (err) {
  //     return res.status(400).send(err);
  //   }
  //   console.log("BACKEND", results)
  //   return res.status(200).send(results);
  // });

  Jobs.find({ jobTitle: req.query.what })
    .then((response) => {
      console.log("DONE", response);
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log("NOT DONE");
    });
});

router.put("/updateReview/:id", async (req, res) => {
  req.body.path = "UpdateHelpfulnessScore";
  req.body.reviewId = req.params.id;
  kafka.make_request("jobSeeker-topic", req.body, function (err, results) {
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

  kafka.make_request("jobSeeker-topic", req.body, function (err, results) {
    if (err) {
      return res.status(400).send(err);
    }

    return res.status(200).send(results);
  });
});
module.exports = router;
