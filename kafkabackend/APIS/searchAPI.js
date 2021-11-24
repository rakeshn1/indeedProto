const getCompanyNamesAndJobTitles = (msg, callback) => {
  const res = {};
  res.data = ["Amazon", "Amazon Inc."];
  try {
    console.log("In getCompanyNamesAndJobTitles");
    res.status = 200;
    callback(null, res);
  } catch (err) {}
};

handle_request = (msg, callback) => {
  if (msg.path === "getCompanyNamesAndJobTitles") {
    // delete msg.path;
    console.log("Kafka side1");
    getCompanyNamesAndJobTitles(msg, callback);
  }
};

exports.handle_request = handle_request;
