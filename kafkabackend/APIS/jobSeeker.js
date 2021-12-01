const { Reviews } = require("../models/review");
const Company = require("../models/company");

async function addReview(body, callback) {
  try {
    const review = new Reviews(body);
    await review.save();
    callback(null, "Added Review");
  } catch (ex) {
    console.log(ex);
    callback(ex, "Error");
  }
}

async function updateReview(body, callback) {
  try {
    console.log("reviewId", body.reviewId);
    let review = await Reviews.findById(body.reviewId);
    if (body.isHelpful) {
      review.helpfulnessScore.yesCount = review.helpfulnessScore.yesCount + 1;
    } else {
      review.helpfulnessScore.noCount = review.helpfulnessScore.noCount + 1;
    }
    await review.save();
    callback(null, "updated review");
  } catch (ex) {
    console.log(ex);
    callback(ex, "Error");
  }
}
async function getJobSearchResults(body, callback) {
  try {
    console.log("body", body);

    callback(null, "Sent Results");
  } catch (ex) {
    console.log(ex);
    callback(ex, "Error");
  }
}

async function getCompanyReviews(body, callback) {
  try {
    let sortprops = {};
    let filterprops = {};
    if (body.params?.isFeatured) {
      filterprops = {
        status: { $in: [1, 2] },
      };
    } else {
      filterprops = {
        status: { $in: [1, 2] },
      };
    }

    let filteredKey;
    if (body.params?.filter) {
      filteredKey = JSON.parse(body.params?.filter);
      console.log(filteredKey);
      if (filteredKey?.rating) filterprops.rating = Number(filteredKey?.rating);
      if (filteredKey.date) {
        if (filteredKey.date == "Last_Week") {
          filterprops.date = {
            $lte: new Date(),
            $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
          };
        } else if (filteredKey.date == "Last_Month") {
          monthData = new Date();
          monthData.setMonth(monthData.getMonth() - 1);
          filterprops.date = {
            $lte: monthData.getMonth(),
            $gte: monthData,
          };
        } else if (filteredKey.date == "This_Month") {
          monthData = new Date();
          monthData.setMonth(monthData.getMonth() - 1);
          filterprops.date = {
            $gte: monthData.getMonth(),
          };
        } else if (filteredKey.date == "This_Week") {
          filterprops.date = {
            $lte: new Date(),
            $gte: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
          };
        }
      }
    }

    if (body.params?.sortBy) {
      sortprops[body.params.sortBy] = -1;
    } else {
      sortprops.date = -1;
    }

    let pageNo = body.params.pageNo == undefined ? 1 : body.params.pageNo;
    let limit = 5;
    let skip = (pageNo - 1) * limit;

    let reviews = await Reviews.find(filterprops)
      .sort(sortprops)
      .skip(skip)
      .limit(limit);

    callback(null, reviews);
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

  if (msg.path === "getJobSearchResults") {
    delete msg.path;
    console.log("HERE");
    console.log("Kafka side1");
    getJobSearchResults(msg, callback);
  }

  if (msg.path === "UpdateHelpfulnessScore") {
    delete msg.path;
    updateReview(msg, callback);
  }

  if (msg.path === "getCompanyReviews") {
    delete msg.path;
    getCompanyReviews(msg, callback);
  }
};

exports.handle_request = handle_request;
