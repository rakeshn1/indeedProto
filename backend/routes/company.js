const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const kafka = require('../kafka/client')

router.get(`/api/getCompanyDetails/:id`, (req, res) => {
    req.body.companyId = req.params.id;
    req.body.path = "getCompanyDetails"
    kafka.make_request('companytopic', req.body, (err, res) => {
        console.log(err)
        console.log("LOLOLOL", res)
        if (res.status == 200) {
            const companyDetails = JSON.parse(res.data)
            return res.status(200).send(companyDetails)
        }
        else if (res.status == 404) {
            return res.status(404).send("User Not Found")
        }
        else if (res.status == 401) {
            return res.status(401).send("Invalid username or password")
        }
    })
})

router.post(`/api/addCompanyDetails`, (req, res) => {
    req.body.path = "addCompanyDetails"
    kafka.make_request('companytopic', req.body, (err, res) => {
        console.log(err)
        console.log("LOLOLOL", res)
        if (res.status == 200) {
            //const companyDetails = JSON.parse(res.data)
            return res.status(200).send({msg:"success"})
        }
        else if (res.status == 404) {
            return res.status(404).send("User Not Found")
        }
        else if (res.status == 401) {
            return res.status(401).send("Invalid username or password")
        }
    })
})

router.put(`/api/updateCompanyDetails/:id`, (req, res) => {
    req.body.companyId = req.params.id;
    req.body.path = "updateCompanyDetails"
    kafka.make_request('companytopic', req.body, (err, res) => {
        console.log(err)
        console.log("LOLOLOL", res)
        if (res.status == 200) {
            //const companyDetails = JSON.parse(res.data)
            return res.status(200).send({msg:"success"})
        }
        else if (res.status == 404) {
            return res.status(404).send("User Not Found")
        }
        else if (res.status == 401) {
            return res.status(401).send("Invalid username or password")
        }
    })
})


module.exports = router