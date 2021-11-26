const { User } = require("../models/user")

async function addAccount(msg, callback) {
    const res = {}
    try {
        const email = msg.body.email;
        const password = msg.body.password;
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
            companyRole
        })
        const data = await userDetails.save();

        console.log("Response after adding user details ", res)
        res.status = 200
        res.data = data
        callback(null, res)
    }
    catch (err) {
        console.log(err)
        res.status = 400
        callback(null, res)
    }
}

handle_request = (msg, callback) => {
    if (msg.path === "addAccount") {
        delete msg.path;
        console.log("Kafka side1-add");
        addAccount(msg, callback);
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