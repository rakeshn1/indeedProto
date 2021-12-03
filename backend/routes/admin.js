const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const mysql = require("mysql");
const config = require("config");
const DB = config.get("sqlDB");
const { Company } = require("../models/mongo/company");
const _ = require("lodash");

const db = mysql.createPool({
  host: DB.host,
  port: DB.port,
  user: DB.username,
  password: DB.password,
  database: DB.database,
});

db.getConnection((err) => {
  if (err) console.log(err);
  else console.log("Connected to SQL database...");
});

const topic = "admin";

router.get("/getUnapprovedReviews", async (req, res) => {
  const msg = {};
  msg.path = "getUnapprovedReviews";
  console.log("MSG = ADMIN: ", msg);
  kafka.make_request(topic, msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

router.post("/updateStatusOfReview", async (req, res) => {
  const msg = {};
  msg.body = req.body;
  msg.path = "updateStatusOfReview";
  console.log("MSG = ADMIN: ", msg);
  kafka.make_request(topic, msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

router.put("/updateStatusOfPhoto", async (req, res) => {
  const msg = {};
  msg.body = req.body;
  msg.path = "updateStatusOfPhoto";
  console.log("MSG = ADMIN: ", msg);
  kafka.make_request(topic, msg, function (err, results) {
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
    kafka.make_request(topic, msg, function (err, results) {
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
  kafka.make_request(topic, msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

router.get("/numberOfReviewsPerDay", async (req, res) => {
  const msg = {};
  msg.path = "numberOfReviewsPerDay";
  console.log("MSG = ADMIN: ", msg);
  kafka.make_request(topic, msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

// router.get("/numberOfReviewsPerDay", async (req, res) => {
//   const msg = {};
//   msg.path = "numberOfReviewsPerDay";
//   console.log("MSG = ADMIN: ", msg);
//   kafka.make_request(topic, msg, function (err, results) {
//     console.log("Results: ", results);
//     res.status(results.status).send(results.data);
//   });
// });

router.get("/topfiveReviewedCompanies", async (req, res) => {
  const msg = {};
  msg.path = "topfiveReviewedCompanies";
  console.log("MSG = ADMIN: ", msg);
  kafka.make_request(topic, msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

router.get("/topfiveJobSeekersBasedOnAcceptedReviews", async (req, res) => {
  const msg = {};
  msg.path = "topfiveJobSeekersBasedOnAcceptedReviews";
  console.log("MSG = ADMIN: ", msg);
  kafka.make_request(topic, msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

router.get("/topTenCeosApproved", async (req, res) => {
  const msg = {};
  msg.path = "topTenCeosApproved";
  console.log("MSG = ADMIN: ", msg);
  kafka.make_request(topic, msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

router.get("/topFiveCompaniesBasedOnAverageRating", async (req, res) => {
  const msg = {};
  msg.path = "topFiveCompaniesBasedOnAverageRating";
  console.log("MSG = ADMIN: ", msg);
  kafka.make_request(topic, msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

router.get("/getAllCompanies", async (req, res) => {
  const msg = {};
  msg.path = "getAllCompanies";
  console.log("MSG = ADMIN: ", msg);

  kafka.make_request(topic, msg, function (err, results) {
    console.log("Results: ", results);
    res.status(results.status).send(results.data);
  });
});

//SQL routes

router.post("/insertPhoto", (req, res) => {
  console.log("insert photos called!");
  const companyId = req.body.companyId;
  const imageURL = req.body.imageURL;

  const sqlInsert = "INSERT INTO newPhotos (companyId,S3Url) VALUES (?,?)";
  db.query(sqlInsert, [companyId, imageURL], (err, result) => {
    console.log(result);
  });
  res.send("done");
});

router.get("/getAllPhotos", (req, res) => {
  console.log("get unpproved photos called!");

  const sqlSelect = "select * from newPhotos";
  db.query(sqlSelect, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

router.get("/photos/:id", async (req, res) => {
  const companyId = req.params.id;
  console.log("get company photos!");

  const result = await Company.findById(companyId).select("photos");
  console.log("PHOTOS RESULTTTTT: ", result);
  const response = [];

  result.photos?.map((photo) => {
    const temp = {
      companyId: companyId,
      S3Url: photo,
    };
    response.push(temp);
  });

  res.send(response);

  // const sqlSelect = "select * from newPhotos where companyId = ?";
  // db.query(sqlSelect, [companyId], (err, result) => {
  //   console.log(result);
  //   res.send(result);
  // });
});

router.put("/insertViewCount", (req, res) => {
  console.log("inserting a view Count");
  // const photoId = req.body.userName;
  const companyId = req.body.companyId;
  const viewCount = req.body.viewCount;
  const date = req.body.date;

  const sqlInsert =
    "INSERT INTO CompanyViewCount (companyId,viewCount,date) VALUES (?,?,?)";
  db.query(sqlInsert, [companyId, viewCount, date], (err, result) => {
    console.log(result);
  });
  res.send("done");
});

router.get("/getViewCount", async (req, res) => {
  console.log("View Counts");
  let data = [];
  const sqlSelect =
    "select companyId,(SUM(viewCount)) as totalCount from CompanyViewCount group by 1 ORDER BY 2 DESC LIMIT 10";
  db.query(sqlSelect, async (err, result) => {
    console.log(result);
    data = result;
    await Promise.all(
      data.map(async (company) => {
        console.log("COMPANNNNNY: ", company);
        const companyData = await Company.findById(company.companyId).select(
          "name"
        );
        company.name = companyData.name;
        // data.push(company);
      })
    );
    console.log("ViewsCount: ", data);
    data = _.orderBy(data, ["totalCount"], ["desc"]);
    res.send(data);
  });
  // console.log("ViewsCount: ", data);
});

router.post("/incrementViewCount", (req, res) => {
  const sqlSelect =
    "insert into CompanyViewCount (companyId, date) values(?, ?) on duplicate key update viewCount = viewCount + 1";
  db.query(sqlSelect, [req.body.companyId, req.body.date], (err, result) => {
    console.log(result);
  });
  res.send("done");
});

module.exports = router;
