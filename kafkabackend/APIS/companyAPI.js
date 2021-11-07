const bcrypt = require('bcryptjs')
const Company = require('../models/company')


const handleGetCompanyDetails = async (msg, callback) => {
    res = {}
    try {
        debugger
        Company.findbyId(msg.companyId).then((err, res) => {
            console.log("Kafka side", res)
            res.status = 200
            callback(null, res)
        }
        )
    }
    catch (err) {
        console.log(err)
        res.status = 400
        callback(null, res)
    }
}

const addCompanyDetails = async (msg, callback) => {
    res = {}
    const workScore = msg.workScore;
    const happinessScore = msg.happinessScore;
    const learningScore = msg.learningScore;
    const appreciationScore = msg.appreciationScore;
    const about = msg.about;
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

    // if (!email || !password || !name) {
    //     res.status = 500
    //     callback(null, res)
    // }
    const CompanyDetails = new Company({
        workScore,
        happinessScore,
        learningScore,
        appreciationScore,
        about,
        ceo,
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
    })
    try {
        const res = await CompanyDetails.save()
        debugger
        res.status = 200
        callback(null, res)
    }
    catch (err) {
        console.log(err)
        res.status = 400
        callback(null, res)
    }
}

const updateCompanyDetails = async (msg, callback) => {
    res = {}

    const { ceo,
        founded,
        companySize,
        revenue,
        industry,
        mission,
        vision,
        companyType,
        websiteURL } = msg

    // if (!email || !password || !name) {
    //     res.status = 500
    //     callback(null, res)
    // }
    const Company = new Company({
        ceo,
        founded,
        companySize,
        revenue,
        industry,
        mission,
        vision,
        companyType,
        websiteURL,
    })
    try {
        const res = await Company.findOneAndUpdate(msg.companyId)
        res.status = 200
        callback(null, res)
    }
    catch (err) {
        res.status = 400
        callback(null, res)
    }
}


handle_request = (msg, callback) => {
    if (msg.path === "getCompanyDetails") {
        delete msg.path
        console.log("Kafka side1")
        handleGetCompanyDetails(msg, callback)
    }

    if (msg.path === "addCompanyDetails") {
        delete msg.path
        console.log("Kafka side1")
        addCompanyDetails(msg, callback)
    }

    if (msg.path === "updateCompanyDetails") {
        delete msg.path
        console.log("Kafka side1")
        updateCompanyDetails(msg, callback)
    }
}

exports.handle_request = handle_request;

