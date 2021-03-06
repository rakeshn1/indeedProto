const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const kafka = require("../kafka/client");
// const Review = require("../models/review");

const topic = "companytopic";

router.get(`/api/getCompanyDetails/:id`, (req, res) => {
  try {
    req.body.companyId = req.params.id;
    req.body.path = "getCompanyDetails";
    kafka.make_request(topic, req.body, (err, result) => {
      if (err) {
        throw new Error(err);
      }
      console.log("Response received for getCompanyDetails", result);
      if (result.status == 200) {
        const companyDetails = result.data;
        return res.status(200).send(companyDetails);
      } else if (result?.status == 404) {
        return res.status(404).send("Company Not Found");
      } else if (result?.status == 400) {
        return res.status(400).send("Server Error");
      } else {
        return res.status(500).send("Server Error");
      }
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).send("Server Error");
  }
});

router.get(`/api/getEmployerDetails/:id`, (req, res) => {
  try {
    req.body.employerId = req.params.id;
    req.body.path = "getEmployerDetails";
    kafka.make_request(topic, req.body, (err, result) => {
      if (err) {
        throw new Error(err);
      }
      console.log("Response received for getEmployerDetails", result);
      if (result.status == 200) {
        const employerDetails = result.data;
        return res.status(200).send(employerDetails);
      } else if (result?.status == 404) {
        return res.status(404).send("Employer Not Found");
      } else if (result?.status == 400) {
        return res.status(400).send("Server Error");
      } else {
        return res.status(500).send("Server Error");
      }
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).send("Server Error");
  }
});

router.post(`/api/addCompanyDetails`, (req, res) => {
  try {
    req.body.path = "addCompanyDetails";
    console.log(req.body);
    kafka.make_request(topic, req.body, (err, result) => {
      if (err) {
        throw new Error(err);
      }
      console.log("Response received for addCompanyDetails", result);
      if (result?.status == 200) {
        return res.status(200).send(result.data);
      } else if (result.status == 400) {
        return res.status(400).send("Server Error");
      } else {
        return res.status(500).send("Server Error");
      }
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).send("Server Error");
  }
});

router.put(`/api/updateEmployerDetails/:id`, (req, res) => {
  try {
    req.body.employerId = req.params.id;
    req.body.path = "updateEmployerDetails";
    kafka.make_request(topic, req.body, (err, result) => {
      if (err) {
        throw new Error(err);
      }
      console.log("Response received for updateEmployerDetails", result);
      if (result?.status == 200) {
        return res.status(200).send(result.data);
      } else if (result.status == 404) {
        return res.status(404).send("Company Not Found");
      } else if (result.status == 400) {
        return res.status(400).send("Server Error");
      } else {
        return res.status(500).send("Server Error");
      }
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).send("Server Error");
  }
});

router.put(`/api/updateCompanyDetails/:id`, (req, res) => {
  try {
    req.body.companyId = req.params.id;
    req.body.path = "updateCompanyDetails";
    kafka.make_request(topic, req.body, (err, result) => {
      if (err) {
        throw new Error(err);
      }
      console.log("Response received for updateCompanyDetails", result);
      if (result?.status == 200) {
        return res.status(200).send(result.data);
      } else if (result.status == 404) {
        return res.status(404).send("Company Not Found");
      } else if (result.status == 400) {
        return res.status(400).send("Server Error");
      } else {
        return res.status(500).send("Server Error");
      }
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).send("Server Error");
  }
});

router.get(`/api/getCompanyReviews/:id`, async (req, res) => {
  try {
    req.body.companyId = req.params.id;
    req.body.path = "getCompanyReviews";
    kafka.make_request(topic, req.body, (err, result) => {
      if (err) {
        throw new Error(err);
      }
      console.log("Response received for getCompanyReviews", result);
      if (result?.status == 200) {
        const companyReviews = result.data;
        return res.status(200).send(companyReviews);
      } else if (result?.status == 404) {
        return res.status(404).send("Company Not Found");
      } else if (result?.status == 400) {
        return res.status(400).send("Server Error");
      }
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).send("Server Error");
  }
});

router.put(`/api/updateCompanyReviews/:id`, (req, res) => {
  try {
    req.body.reviewId = req.params.id;
    req.body.path = "toggleIsFeatured";
    kafka.make_request(topic, req.body, (err, result) => {
      if (err) {
        throw new Error(err);
      }
      console.log("Response received for updateCompanyReviews", result);
      if (result.status == 200) {
        return res.status(200).send(result.data);
      } else if (result.status == 404) {
        return res.status(404).send("Company Not Found");
      } else if (result.status == 400) {
        return res.status(400).send("Invalid Input ");
      }
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).send("Server Error");
  }
});

router.put(`/api/updateApplicationStatus/:id`, (req, res) => {
  try {
    req.body.applicationId = req.params.id;
    req.body.path = "updateApplicationStatus";
    console.log("updatethis", req.body);
    kafka.make_request(topic, req.body, (err, result) => {
      if (err) {
        throw new Error(err);
      }
      console.log("Response received for updateApplicationStatus", result);
      if (result.status == 200) {
        return res.status(200).send(result.data);
      } else if (result.status == 404) {
        return res.status(404).send("Application Not Found");
      } else if (result.status == 400) {
        return res.status(400).send("Invalid Input ");
      }
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).send("Server Error");
  }
});

router.get(`/api/getCompanyJobs/:id`, async (req, res) => {
  try {
    req.body.companyId = req.params.id;
    req.body.path = "getCompanyJobs";
    kafka.make_request(topic, req.body, (err, result) => {
      if (err) {
        throw new Error(err);
      }
      console.log("Response received for getCompanyJobs", result);
      if (result?.status == 200) {
        const getCompanyJobs = result.data;
        return res.status(200).send(getCompanyJobs);
      } else if (result?.status == 404) {
        return res.status(404).send("Company Not Found");
      } else if (result?.status == 400) {
        return res.status(400).send("Server Error");
      }
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).send("Server Error");
  }
});

router.get(`/api/getAllCompanies`, async (req, res) => {
  try {
    req.body.path = "getAllCompanies";
    kafka.make_request(topic, req.body, (err, result) => {
      if (err) {
        throw new Error(err);
      }
      console.log("Response received for getAllCompanies", result);
      if (result?.status == 200) {
        const getAllCompanies = result.data;
        return res.status(200).send(getAllCompanies);
      } else if (result?.status == 404) {
        return res.status(404).send("Companies do not exist");
      } else if (result?.status == 400) {
        return res.status(400).send("Server Error");
      }
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).send("Server Error");
  }
});

router.post(`/api/addJob/:id`, (req, res) => {
  try {
    req.body.path = "addJob";
    req.body.companyId = req.params.id;
    console.log(req.body);
    kafka.make_request(topic, req.body, (err, result) => {
      if (err) {
        throw new Error(err);
      }
      console.log("Response received for addJob", result);
      if (result?.status == 200) {
        return res.status(200).send(result.data);
      } else if (result.status == 400) {
        return res.status(400).send("Server Error");
      } else {
        return res.status(500).send("Server Error");
      }
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).send("Server Error");
  }
});

router.put(`/api/updateJob/:id`, (req, res) => {
  try {
    req.body.jobID = req.params.id;
    req.body.path = "updateJob";
    kafka.make_request(topic, req.body, (err, result) => {
      if (err) {
        throw new Error(err);
      }
      console.log("Response received for updateCompanyDetails", result);
      if (result?.status == 200) {
        return res.status(200).send(result.data);
      } else if (result.status == 404) {
        return res.status(404).send("Job Not Found");
      } else if (result.status == 400) {
        return res.status(400).send("Server Error");
      } else {
        return res.status(500).send("Server Error");
      }
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).send("Server Error");
  }
});

router.post(`/api/addJobApplication`, (req, res) => {
  try {
    req.body.path = "addJobApplication";
    kafka.make_request(topic, req.body, (err, result) => {
      if (err) {
        throw new Error(err);
      }
      console.log("Response received for addJobApplication", result);
      if (result?.status == 200) {
        return res.status(200).send(result.data);
      } else if (result.status == 400) {
        return res.status(400).send("Server Error");
      } else {
        return res.status(500).send("Server Error");
      }
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).send("Server Error");
  }
});

router.put(`/api/updateJobApplication/:id`, (req, res) => {
  try {
    req.body.jobApplicationID = req.params.id;
    req.body.path = "updateJobApplication";
    kafka.make_request(topic, req.body, (err, result) => {
      if (err) {
        throw new Error(err);
      }
      console.log("Response received for updateJobApplication", result);
      if (result?.status == 200) {
        return res.status(200).send(result.data);
      } else if (result.status == 404) {
        return res.status(404).send("Job Application Not Found");
      } else if (result.status == 400) {
        return res.status(400).send("Server Error");
      } else {
        return res.status(500).send("Server Error");
      }
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).send("Server Error");
  }
});

router.get(`/api/getApplicationDetails/:id`, async (req, res) => {
  try {
    req.body.jobApplicationID = req.params.id;
    req.body.path = "getApplicationDetails";
    kafka.make_request(topic, req.body, (err, result) => {
      if (err) {
        throw new Error(err);
      }
      console.log("Response received for getApplicationDetails", result);
      if (result.status == 200) {
        const getCompanyJobs = result.data;
        return res.status(200).send(getCompanyJobs);
      } else if (result?.status == 404) {
        return res.status(404).send("Application Not Found");
      } else if (result?.status == 400) {
        return res.status(400).send("Server Error");
      }
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).send("Server Error");
  }
});

router.post(`/api/createConversation`, (req, res) => {
  try {
    req.body.path = "createConversation";
    kafka.make_request(topic, req.body, (err, result) => {
      if (err) {
        throw new Error(err);
      }
      console.log("Response received for createConversation", result);
      if (result?.status == 200) {
        return res.status(200).send(result.data);
      } else if (result.status == 400) {
        return res.status(400).send("Server Error");
      } else {
        return res.status(500).send("Server Error");
      }
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).send("Server Error");
  }
});

router.put(`/api/updateConversation/:id`, (req, res) => {
  try {
    req.body.conversationId = req.params.id;
    req.body.path = "updateConversation";
    kafka.make_request(topic, req.body, (err, result) => {
      if (err) {
        throw new Error(err);
      }
      console.log("Response received for updateConversation", result);
      if (result?.status == 200) {
        return res.status(200).send(result.data);
      } else if (result.status == 404) {
        return res.status(404).send("Conversation Not Found");
      } else if (result.status == 400) {
        return res.status(400).send("Server Error");
      } else {
        return res.status(500).send("Server Error");
      }
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).send("Server Error");
  }
});

router.get(`/api/getAllConversations/:id`, async (req, res) => {
  try {
    req.body.companyId = req.params.id;
    req.body.path = "getAllConversations";
    kafka.make_request(topic, req.body, (err, result) => {
      if (err) {
        throw new Error(err);
      }
      console.log("Response received for getAllConversations", result);
      if (result?.status == 200) {
        const getCompanyJobs = result.data;
        return res.status(200).send(getCompanyJobs);
      } else if (result?.status == 404) {
        return res.status(404).send("Company Not Found");
      } else if (result?.status == 400) {
        return res.status(400).send("Server Error");
      }
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).send("Server Error");
  }
});

router.get(`/api/getAllConversationsJobSeeker/:id`, async (req, res) => {
  try {
    req.body.jobSeekerId = req.params.id;
    req.body.path = "getAllConversationsJobSeeker";
    kafka.make_request(topic, req.body, (err, result) => {
      if (err) {
        throw new Error(err);
      }
      console.log("Response received for getAllConversationsJobSeeker", result);
      if (result?.status == 200) {
        const getCompanyJobs = result.data;
        return res.status(200).send(getCompanyJobs);
      } else if (result?.status == 404) {
        return res.status(404).send("Company Not Found");
      } else if (result?.status == 400) {
        return res.status(400).send("Server Error");
      }
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).send("Server Error");
  }
});

router.get(`/api/getConversation/:id`, async (req, res) => {
  try {
    req.body.id = req.params.id;
    req.body.path = "getConversation";
    kafka.make_request(topic, req.body, (err, result) => {
      if (err) {
        throw new Error(err);
      }
      console.log("Response received for getConversation", result);
      if (result?.status == 200) {
        const getCompanyJobs = result.data;
        return res.status(200).send(getCompanyJobs);
      } else if (result?.status == 404) {
        return res.status(404).send("Conversation Not Found");
      } else if (result?.status == 400) {
        return res.status(400).send("Server Error");
      }
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
