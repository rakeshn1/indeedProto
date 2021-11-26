const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const kafka = require("../kafka/client");
// const { Jobs } = require("../models/mongo/jobs.js");

router.post("/addAccount", async (req, res) => {
    console.log(req.body);
    let msg = {}
    msg.body = req.body
    msg.path = "addAccount";
    kafka.make_request("newUser-topic", msg, function (err, results) {
        if (err) {
            return res.send(err);
        }
        return res.send(results);
    });

});


module.exports = router;
