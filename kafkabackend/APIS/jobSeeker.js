const Review = require("../models/review");
const Company = require("../models/company");

async function addReview(body, callback) {
  try {
    const review = new Review(body);
    await review.save();
    callback(null, "Added Review");
  } catch (ex) {
    console.log(ex);
    callback(ex, "Error");
  }
}

handle_request = (msg, callback) => {
  if (msg.path === "addReview") {
    delete msg.path;
    console.log("Kafka side1");
    addReview(msg, callback);
  }
};

exports.handle_request = handle_request;
