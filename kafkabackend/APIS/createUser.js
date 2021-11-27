const { User } = require("../models/user");
const bcrypt = require("bcrypt");

async function addAccount(msg, callback) {
  const res = {};
  try {
    let user = await User.findOne({ email: msg.body.email });
    if (user) return res.status(400).send("Username already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(msg.body.password, salt);

    const email = msg.body.email;
    const password = hashedPassword;
    const role = msg.body.role;
    const firstName = msg.body.firstName;
    const lastName = msg.body.lastName;
    const phoneNumber = msg.body.phoneNumber;
    const savedJobs = msg.body.savedJobs;
    const resume = msg.body.resume;
    const coverLetter = msg.body.coverLetter;
    const address = msg.body.address;
    const companyRole = msg.body.companyRole;

    const userDetails = new User({
      email,
      password,
      role,
      firstName,
      lastName,
      phoneNumber,
      savedJobs,
      resume,
      coverLetter,
      address,
      companyRole,
    });
    const data = await userDetails.save();

    console.log("Response after adding user details ", res);
    res.status = 200;
    res.data = data;
    callback(null, res);
  } catch (err) {
    console.log(err);
    res.status = 400;
    callback(null, res);
  }
}

const login = async (msg, callback) => {
  let res = {};
  try {
    const { email, password } = msg.body;

    let user = await User.findOne({ email });
    console.log("USER.email", user);

    if (!user) {
      res.status = 400;
      res.data = "Invalid username";
      // return res.status(400).send("Invalid username");
      callback(null, res);
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.status = 400;
      res.data = "Invalid username or password";
      // return res.status(400).send("Invalid password");
      callback(null, res);
    }

    const token = user.generateAuthToken();
    console.log("TOKENNNN: ", token);
    // res.send(token);
    res.status = 200;
    res.data = token;
    callback(null, res);
  } catch (ex) {
    console.log("ERROR: post:auth/ ", ex);
  }
};

handle_request = (msg, callback) => {
  if (msg.path === "addAccount") {
    delete msg.path;
    console.log("Kafka side1-add");
    addAccount(msg, callback);
  }
  if (msg.path === "login") {
    console.log("Kafka side1-add");
    login(msg, callback);
  }

  // if (msg.path === "getJobSearchResults") {
  //   delete msg.path;
  //   console.log("Kafka side1");
  //   getJobSearchResults(msg, callback);
  // }

  // if (msg.path === "jobSaveUnsave") {
  //   delete msg.path;
  //   console.log("Kafka side1 - HERE");
  //   handleJobSaveUnsave(msg, callback);
  // }
};

exports.handle_request = handle_request;
