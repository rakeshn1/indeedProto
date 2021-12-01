const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");

router.get("/getUnapprovedReviews", async (req, res) => {
  const msg = {};
  msg.path = "getUnapprovedReviews";
  console.log("MSG = ADMIN: ", msg);
  kafka.make_request("admin", msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

router.post("/updateStatusOfReview", async (req, res) => {
  const msg = {};
  msg.body = req.body;
  msg.path = "updateStatusOfReview";
  console.log("MSG = ADMIN: ", msg);
  kafka.make_request("admin", msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

router.post("/updateStatusOfPhoto", async (req, res) => {
  const msg = {};
  msg.body = req.body;
  msg.path = "updateStatusOfPhoto";
  console.log("MSG = ADMIN: ", msg);
  kafka.make_request("admin", msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

router.get(
  "/getListOfAllReviewsExceptUnApproved/:companyId",
  async (req, res) => {
    const msg = {};
    msg.params = req.params;
    msg.path = "getListOfAllReviewsExceptUnApproved";
    console.log("MSG = ADMIN: ", msg);
    kafka.make_request("admin", msg, function (err, results) {
      console.log("Results: ", results);
      res.status(results.status).send(results.data);
    });
  }
);

router.get("/getJobStats/:companyId", async (req, res) => {
  const msg = {};
  msg.params = req.params;
  msg.path = "getJobStats";
  console.log("MSG = ADMIN: ", msg);
  kafka.make_request("admin", msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

router.get("/numberOfReviewsPerDay", async (req, res) => {
  const msg = {};
  msg.path = "numberOfReviewsPerDay";
  console.log("MSG = ADMIN: ", msg);
  kafka.make_request("admin", msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

// router.get("/numberOfReviewsPerDay", async (req, res) => {
//   const msg = {};
//   msg.path = "numberOfReviewsPerDay";
//   console.log("MSG = ADMIN: ", msg);
//   kafka.make_request("admin", msg, function (err, results) {
//     console.log("Results: ", results);
//     res.status(results.status).send(results.data);
//   });
// });

router.get("/topfiveReviewedCompanies", async (req, res) => {
  const msg = {};
  msg.path = "topfiveReviewedCompanies";
  console.log("MSG = ADMIN: ", msg);
  kafka.make_request("admin", msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

router.get("/topfiveJobSeekersBasedOnAcceptedReviews", async (req, res) => {
  const msg = {};
  msg.path = "topfiveJobSeekersBasedOnAcceptedReviews";
  console.log("MSG = ADMIN: ", msg);
  kafka.make_request("admin", msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

router.get("/topTenCeosApproved", async (req, res) => {
  const msg = {};
  msg.path = "topTenCeosApproved";
  console.log("MSG = ADMIN: ", msg);
  kafka.make_request("admin", msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

module.exports = router;
