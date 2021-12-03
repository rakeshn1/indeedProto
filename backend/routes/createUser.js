const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const kafka = require("../kafka/client");
// const { Jobs } = require("../models/mongo/jobs.js");

const topic = "newUser-topic";

router.post("/addAccount", async (req, res) => {
  console.log(req.body);
  let msg = {};
  msg.body = req.body;
  msg.path = "addAccount";
  kafka.make_request(topic, msg, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
});

router.post("/login", async (req, res) => {
  const msg = {};
  console.log("req.body: ", req.body);
  msg.body = req.body;
  msg.path = "login";
  console.log("MSG = IN SEARCH: ", msg);
  kafka.make_request(topic, msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

module.exports = router;
