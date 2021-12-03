const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");

const topic = "search-topic";

router.get("/getCompanyNamesAndJobTitles/:term", async (req, res) => {
  const msg = {};
  msg.term = req.params.term;
  msg.path = "getCompanyNamesAndJobTitles";
  console.log("MSG = IN SEARCH: ", msg);
  kafka.make_request(topic, msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

router.get("/getCompanyNames/:term", async (req, res) => {
  const msg = {};
  msg.term = req.params.term;
  msg.path = "getCompanyNames";
  console.log("MSG = IN SEARCH: ", msg);
  kafka.make_request(topic, msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

router.get("/getCompaniesByName/:term", async (req, res) => {
  const msg = {};
  msg.term = req.params.term;
  msg.path = "getCompaniesByName";
  console.log("MSG = IN SEARCH: ", msg);
  kafka.make_request(topic, msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

router.get("/getJobTitles/:term", async (req, res) => {
  const msg = {};
  msg.term = req.params.term;
  msg.path = "getJobTitles";
  console.log("MSG = IN SEARCH: ", msg);
  kafka.make_request(topic, msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

router.get("/getLocations/:term", async (req, res) => {
  const msg = {};
  msg.term = req.params.term;
  msg.path = "getLocations";
  console.log("MSG = IN SEARCH: ", msg);
  kafka.make_request(topic, msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

router.get("/getReviews", async (req, res) => {
  const msg = {};
  msg.companyNameOrJobTitle = req.query.companyNameOrJobTitle;
  console.log("-============");
  console.log("req: ", req.query);
  console.log("-============");
  msg.location = req.query.location;
  msg.path = "getReviews";
  console.log("MSG = IN SEARCH: ", msg);
  kafka.make_request(topic, msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

router.get("/getSalaryReviewsMainData", async (req, res) => {
  const msg = {};
  msg.jobTitle = req.query.jobTitle;
  console.log("-============");
  console.log("req: ", req.query);
  console.log("-============");
  msg.location = req.query.location;
  msg.path = "getSalaryReviewsMainData";
  console.log("MSG = IN SEARCH: ", msg);
  kafka.make_request(topic, msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

router.get("/getSalaryReviewsRankedJobs", async (req, res) => {
  const msg = {};
  msg.jobTitle = req.query.jobTitle;
  console.log("-============");
  console.log("req: ", req.query);
  console.log("-============");
  msg.location = req.query.location;
  msg.path = "getSalaryReviewsRankedJobs";
  console.log("MSG = IN SEARCH: ", msg);
  kafka.make_request(topic, msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

module.exports = router;
