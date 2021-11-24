const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");

router.get("/getCompanyNamesAndJobTitles/:term/:location", async (req, res) => {
  const msg = {};
  msg.term = req.params.term;
  msg.location = req.params.location;
  msg.path = "getCompanyNamesAndJobTitles";
  console.log("MSG = IN SEARCH: ", msg);
  kafka.make_request("search-topic", msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

module.exports = router;
