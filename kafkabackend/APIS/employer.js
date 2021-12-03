const { Company } = require('../models/company')
const { Reviews } = require('../models/review')
const { Jobs } = require('../models/jobs')
const { JobApplication } = require('../models/jobApplications')
const { User } = require('../models/user')
const { Messages } = require('../models/message')
const ObjectId = require('mongoose').Types.ObjectId
const handleGetCompanyDetails = async (msg, callback) => {
    const res = {}
    try {
        const result = await Company.findById(msg.companyId)
        console.log("Results for get company details", result)
        res.status = 200
        res.data = result
        callback(null, res)
    } catch (err) {
        console.log(err)
        res.status = 400
        callback(null, res)
    }
}

const addCompanyDetails = async (msg, callback) => {
    const res = {}
    try {
        const workScore = msg.workScore;
        const happinessScore = msg.happinessScore;
        const learningScore = msg.learningScore;
        const appreciationScore = msg.appreciationScore;
        const about = msg.about;
        const name = msg.name;
        const ceo = msg.ceo;
        const founded = msg.founded;
        const companySize = msg.companySize;
        const revenue = msg.revenue;
        const industry = msg.industry;
        const description = msg.description;
        const workCulture = msg.workCulture;
        const mission = msg.mission;
        const vision = msg.vision;
        const values = msg.values;
        const companyType = msg.companyType;
        const websiteURL = msg.websiteURL;
        const photos = msg.photos;
        const headQuarters = msg.headQuarters;

        const CompanyDetails = new Company({
            workScore,
            happinessScore,
            learningScore,
            appreciationScore,
            about,
            ceo,
            name,
            founded,
            companySize,
            revenue,
            industry,
            description,
            mission,
            values,
            workCulture,
            vision,
            companyType,
            websiteURL,
            photos,
            headQuarters
        })
        const data = await CompanyDetails.save();

        console.log("Response after adding company details ", res)
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

const updateCompanyDetails = async (msg, callback) => {
    const res = {}

    try {
        const { ceo,
            founded,
            companySize,
            revenue,
            industry,
            mission,
            vision,
            companyType,
            websiteURL } = msg

        const result = await Company.findOneAndUpdate({ _id: msg.companyId }, {
            ceo,
            founded,
            companySize,
            revenue,
            industry,
            mission,
            vision,
            companyType,
            websiteURL
        }, {
            new: true
        })
        res.status = 200
        console.log("Response after update company details ", result)
        res.data = result
        callback(null, res)
    }
    catch (err) {
        res.status = 400
        callback(null, res)
    }
}

const updateApplicationStatus = async (msg, callback) => {
    const res = {}
    console.log("msg for update status", msg)
    try {
        const result = await JobApplication.findOneAndUpdate({ _id: msg.applicationId }, {
            status: msg.status
        }, {
            new: true
        })
        res.status = 200
        console.log("Response after update application status ", result)
        res.data = result
        callback(null, res)
    }
    catch (err) {
        console.log(err)
        res.status = 400
        callback(null, res)
    }
}

const handleReviews = async (msg, callback) => {
    const res = {}
    try {
        const result = await Reviews.find({ companyId: msg.companyId })
        console.log("Results of handle review", result)
        res.status = 200
        res.data = result
        callback(null, res)
    }
    catch (err) {
        console.log(err)
        res.status = 400
        callback(null, res)
    }
}

const handleToggleIsFeatured = async (msg, callback) => {
    const res = {}
    try {
        const result = await Reviews.findOneAndUpdate({ _id: msg.reviewId }, { isFeatured: msg.isFeatured })
        console.log("Kafka side", result)
        res.status = 200
        res.data = result
        callback(null, res)
    }
    catch (err) {
        console.log(err)
        res.status = 400
        callback(null, res)
    }
}

const handleGetCompanyJobs = async (msg, callback) => {
    const res = {}
    try {
        const result = await Jobs.find({ companyId: msg.companyId })
        console.log("Results for get company details", result)
        res.status = 200
        res.data = result
        callback(null, res)
    } catch (err) {
        console.log(err)
        res.status = 400
        callback(null, res)
    }
}

const addJob = async (msg, callback) => {
    const res = {}
    try {
        const { jobTitle,
            industry,
            responsibilities,
            location,
            jobType,
            datePosted,
            salary } = msg.values
        const companyId = msg.companyId
        const JobDetails = new Jobs({
            jobTitle,
            companyId,
            industry,
            responsibilities,
            location,
            jobType,
            datePosted,
            salary
        })
        const data = await JobDetails.save();

        console.log("Response after adding job details ", res)
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

const updateJob = async (msg, callback) => {
    const res = {}

    try {
        const { jobTitle,
            companyId,
            industry,
            responsibilities,
            location,
            jobType,
            datePosted } = msg

        const result = await Jobs.findOneAndUpdate({ _id: msg.jobID }, {
            jobTitle,
            companyId,
            industry,
            responsibilities,
            location,
            jobType,
            datePosted
        }, {
            new: true
        })
        res.status = 200
        console.log("Response after update Job ", result)
        res.data = result
        callback(null, res)
    }
    catch (err) {
        res.status = 400
        callback(null, res)
    }
}

const addJobApplication = async (msg, callback) => {
    const res = {}
    try {
        const {
            jobId,
            companyId,
            userId,
            status } = msg

        const JobApplicationDetails = new JobApplication({
            jobId,
            companyId,
            userId,
            status
        })
        const data = await JobApplicationDetails.save();

        console.log("Response after adding job application details ", res)
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

const updateJobApplication = async (msg, callback) => {
    const res = {}

    try {
        const { status } = msg

        const result = await JobApplication.findOneAndUpdate({ _id: msg.jobApplicationID }, {
            status
        }, {
            new: true
        })
        res.status = 200
        console.log("Response after update Job Application ", result)
        res.data = result
        callback(null, res)
    }
    catch (err) {
        res.status = 400
        callback(null, res)
    }
}

const getApplicationDetails = async (msg, callback) => {
    const res = {}
    res.data = []
    var userData = []
    console.log("Himaja", msg)
    try {
        var userIdObject = await JobApplication.find({ jobId: msg.jobApplicationID })
        await Promise.all(userIdObject.map(async (jobApplication, index) => {
            var result = await User.find({ _id: jobApplication.userId })
            userData.push(result[0])
        }))
        console.log("****", userData)
        res.data.push(userIdObject)
        res.data.push(userData)
        res.status = 200



        console.log("yaya", res.data)
        callback(null, res)
    }
    catch (err) {
        console.log(err)
        res.status = 400
        callback(null, res)
    }
}

const createConversation = async (msg, callback) => {
    const res = {}
    try {
        const {
            companyId,
            userId
        } = msg

        const conversationDetails = new Messages({
            companyId,
            userId,
        })
        const data = await conversationDetails.save();

        console.log("Response after adding a conversation details ", res)
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

const updateConversation = async (msg, callback) => {
    const res = {}

    try {
        const { message } = msg
        console.log("_---------before push" + message)
        const result = await Messages.findOneAndUpdate({ _id: msg.conversationId }, {
            $push: { messages: message }
        },
            { new: true })
        console.log("_---------" + result)
        res.status = 200
        console.log("Response after update Job Application ", result)
        res.data = result
        callback(null, res)
    }
    catch (err) {
        res.status = 400
        callback(null, res)
    }
}

const handleGetAllConversations = async (msg, callback) => {
    const res = {}
    try {
        const result = await Messages.aggregate([
            {
                $match: {
                    $and: [{ companyId: ObjectId(msg.companyId) }],
                },
            },
            // { $set: { useObjID: { $toObjectId: 'userId' } } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userRow',
                },
            },
            { $unwind: '$userRow' },
            {
                $project: {
                    _id: 1,
                    userId: 1,
                    companyId: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    firstName: '$userRow.firstName',
                    lastName: '$userRow.lastName'
                },
            },
        ]);
        // const result = await Messages.aggregate( [
        //     { $match: { companyId: ObjectId(msg.companyId) } },
        //     { $group: { _id: "$jobId" , count:{$sum:1}} }
        // ] )
        console.log("Results for get all conversation details", result)
        res.status = 200
        res.data = result
        callback(null, res)
    } catch (err) {
        console.log(err)
        res.status = 400
        callback(null, res)
    }
}

const handleGetConversation = async (msg, callback) => {
    const res = {}
    try {
        const result = await Messages.aggregate([
            {
                $match: {
                    $and: [{ _id: ObjectId(msg.id) }],
                },
            },
            // { $set: { useObjID: { $toObjectId: 'userId' } } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userRow',
                },
            },
            { $unwind: '$userRow' },
            {
                $project: {
                    _id: 1,
                    userId: 1,
                    companyId: 1,
                    messages: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    firstName: '$userRow.firstName',
                    lastName: '$userRow.lastName'
                },
            },
        ]);
        // const result = await Messages.aggregate( [
        //     { $match: { companyId: ObjectId(msg.companyId) } },
        //     { $group: { _id: "$jobId" , count:{$sum:1}} }
        // ] )
        console.log("Results for get conversation details", result)
        res.status = 200
        res.data = result
        callback(null, res)
    } catch (err) {
        console.log(err)
        res.status = 400
        callback(null, res)
    }
}

handle_request = (msg, callback) => {
    if (msg.path === "getCompanyDetails") {
        delete msg.path
        console.log("handling GetCompanyDetails")
        handleGetCompanyDetails(msg, callback)
    }

    if (msg.path === "addCompanyDetails") {
        delete msg.path
        console.log("handling addCompanyDetails")
        addCompanyDetails(msg, callback)
    }

    if (msg.path === "updateCompanyDetails") {
        delete msg.path
        console.log("handling updateCompanyDetails")
        updateCompanyDetails(msg, callback)
    }

    if (msg.path === "updateApplicationStatus") {
        delete msg.path
        console.log("handling updateApplicationStatus")
        updateApplicationStatus(msg, callback)
    }

    if (msg.path === "getCompanyReviews") {
        delete msg.path
        console.log("handling getCompanyReviews")
        handleReviews(msg, callback)
    }

    if (msg.path === "toggleIsFeatured") {
        delete msg.path
        console.log("handling  toggleIsFeatured")
        handleToggleIsFeatured(msg, callback)
    }

    if (msg.path === "getCompanyJobs") {
        delete msg.path
        console.log("handling GetCompanyDetails")
        handleGetCompanyJobs(msg, callback)
    }

    if (msg.path === "addJob") {
        delete msg.path
        console.log("handling addCompanyDetails")
        addJob(msg, callback)
    }

    if (msg.path === "updateJob") {
        delete msg.path
        console.log("handling updateJob")
        updateJob(msg, callback)
    }

    if (msg.path === "addJobApplication") {
        delete msg.path
        console.log("handling addCompanyDetails")
        addJobApplication(msg, callback)
    }

    if (msg.path === "updateJobApplication") {
        delete msg.path
        console.log("handling updateJob")
        updateJobApplication(msg, callback)
    }



    if (msg.path === "getApplicationDetails") {
        delete msg.path
        console.log("handling getApplicationDetails")
        getApplicationDetails(msg, callback)
    }

    if (msg.path === "createConversation") {
        delete msg.path
        console.log("handling createConversation")
        createConversation(msg, callback)
    }

    if (msg.path === "updateConversation") {
        delete msg.path
        console.log("handling updateJob")
        updateConversation(msg, callback)
    }

    if (msg.path === "getAllConversations") {
        delete msg.path
        console.log("handling getAllConversations")
        handleGetAllConversations(msg, callback)
    }

    if (msg.path === "getConversation") {
        delete msg.path
        console.log("handling getConversation")
        handleGetConversation(msg, callback)
    }
}

exports.handle_request = handle_request;

