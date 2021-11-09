const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const kafka = require("../kafka/client");

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

module.exports = router;
