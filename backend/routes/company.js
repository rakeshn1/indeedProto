const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const kafka = require('../kafka/client')
const Review = require("../models/review");

router.get(`/api/getCompanyDetails/:id`, (req, res) => {
    req.body.companyId = req.params.id;
    req.body.path = "getCompanyDetails"
    kafka.make_request('companytopic', req.body, (err, result) => {
        console.log(err)
        console.log("LOLOLOL", result)
        if (result?.status == 200) {
            const companyDetails = result.data
            return res.status(200).send(companyDetails)
        }
        else if (result?.status == 404) {
            return res.status(404).send("User Not Found")
        }
        else if (result?.status == 400) {
            return res.status(400).send("Server Error")
        }
    })
})

router.post(`/api/addCompanyDetails`, (req, res) => {
    req.body.path = "addCompanyDetails"
    kafka.make_request('companytopic', req.body, (err, result) => {
        console.log(err)
        console.log("LOLOLOL", result)
        if (result.status == 200) {
            return res.status(200).send(result.data)
        }
        else if (result.status == 404) {
            return res.status(404).send("User Not Found")
        }
        else if (result.status == 400) {
            return res.status(400).send("Server Error")
        }
    })
})

router.put(`/api/updateCompanyDetails/:id`, (req, res) => {
    req.body.companyId = req.params.id;
    req.body.path = "updateCompanyDetails"
    kafka.make_request('companytopic', req.body, (err, result) => {
        console.log(err)
        console.log("LOLOLOL", result)
        if (result.status == 200) {
            //const companyDetails = JSON.parse(res.data)
            return res.status(200).send(result.data)
        }
        else if (result.status == 404) {
            return res.status(404).send("User Not Found")
        }
        else if (result.status == 400) {
            return res.status(400).send("Server Error")
        }
    })
})

router.get(`/api/getCompanyReviews/:id`, async (req, res) => {
    req.body.companyId = req.params.id;
    req.body.path = "getCompanyReviews"
    try{
        const result = await Review.find({companyId:req.params.id})
        console.log("Kafka side", result)
        return res.status(200).send(result)
    }catch (e) {
        console.log("error",e)
        return res.status(400).send("server error")
    }
    // kafka.make_request('companytopic', req.body, (err, result) => {
    //     console.log(err)
    //     console.log("LOLOLOL", result)
    //     if (result?.status == 200) {
    //         const companyReviews = result.data
    //         return res.status(200).send(companyReviews)
    //     }
    //     else if (result?.status == 404) {
    //         return res.status(404).send("User Not Found")
    //     }
    //     else if (result?.status == 400) {
    //         return res.status(400).send("Server Error")
    //     }
    // })
})

router.put(`/api/updateCompanyReviews/:id`, (req, res) => {
    req.body.companyId = req.params.id;
    req.body.path = "toggleIsFeatured";
    kafka.make_request('companytopic', req.body, (err, result) => {
        console.log(err)
        console.log("LOLOLOL", result)
        if (result.status == 200) {
            //const companyDetails = JSON.parse(res.data)
            return res.status(200).send(result.data)
        }
        else if (result.status == 404) {
            return res.status(404).send("Company Not Found")
        }
        else if (result.status == 400) {
            return res.status(400).send("Invalid Input ")
        }
    })
})
module.exports = router