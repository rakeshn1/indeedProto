import React, { useState } from 'react'
import Button from '../common/Button'
import { Formik } from 'formik';
import JobPostingsHeader from './JobPostingsHeader';
import axios from 'axios';
import { getCurrentUser, getJwt } from "../../services/auth";

import { TextField } from "@material-ui/core";
const AddJobs = () => {
    const user = getCurrentUser();
    const jobTypes = [{
        "label": 0,
        "value": "FullTime",
    },
    {
        "label": 1,
        "value": "PartTime",
    },
    {
        "label": 2,
        "value": "Remote",
    }
    ]
    return (
        <div className="container">
            <section className="page-section" id="about">
                <div style={{ justifyContent: 'center' }}>
                    <div className="row" style={{ justifyContent: 'center' }}>
                        <Formik
                            style={{ width: '40%' }}
                            initialValues={{
                                jobTitle: "",
                                industry: "",
                                jobType: "",
                                salary: 0,
                                description: "",
                                responsibilities: "",
                                location:
                                {
                                    city: "",
                                    state: "",
                                    country: "",
                                    zipcode: "",
                                },
                                datePosted: new Date().toISOString(),
                            }}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                console.log(values)
                                console.log(user)
                                axios.post(`http://localhost:3900/employer/api/addJob/${user.companyId}`, { values })
                                    .then(response => {
                                        console.log(response)
                                        if (response.status != 200) {
                                            // M.toast({ html: response.statusText, classes: "#c62828 red darken-3" })\
                                            alert("Failed to add job")
                                        }
                                        else {
                                            alert("Job Added Successfully")
                                            resetForm({})
                                            //M.toast({ html: "Updated Customer details successfully", classes: "#43a047 green darken-1" })
                                        }
                                    }).catch(err => {
                                        console.log(err)
                                    })

                            }}>
                            {({
                                errors,
                                handleBlur,
                                handleChange,
                                handleSubmit,
                                isSubmitting,
                                touched,
                                values
                            }) => (
                                <form id="contactForm" style={{ width: '40%' }} name="sentMessage" onSubmit={handleSubmit}>
                                    <div style={{ justifyContent: 'center', padding: 40 }}>
                                        <JobPostingsHeader />
                                    </div>
                                    <h4 className="font-weight-normal" style={{ fontFamily: 'UberMoveText-Medium,Helvetica,sans-serif' }}> Add a new Job</h4>
                                    <br />
                                    <div className="row">
                                        <div className="col-md-12">

                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Job Title <input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="jobTitle" onBlur={handleBlur} onChange={handleChange} value={values.jobTitle} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group">
                                                <label style={{ width: "100%" }}>Industry<input required style={{ width: "100%", borderRadius: 10 }} className="form-control" id="industry" type="text" onBlur={handleBlur} onChange={handleChange} value={values.industry} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Responsibilities <input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="responsibilities" onBlur={handleBlur} onChange={handleChange} value={values.responsibilities} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Job Type
                                                    <TextField
                                                        fullWidth
                                                        name="jobType"
                                                        size="small"
                                                        onChange={handleChange}
                                                        required
                                                        select
                                                        SelectProps={{ native: true }}
                                                        value={values.jobType}
                                                        variant="outlined"
                                                        margin="normal"
                                                    >

                                                        <option value="" />
                                                        {jobTypes.map((option) => (
                                                            <option
                                                                key={option.label}
                                                                value={option.label}
                                                            >
                                                                {option.value}
                                                            </option>
                                                        ))}
                                                    </TextField> </label><p className="help-block text-danger"></p>
                                            </div>

                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Salary<input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="salary" onBlur={handleBlur} onChange={handleChange} value={values.salary} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Description<input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="description" onBlur={handleBlur} onChange={handleChange} value={values.description} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Street Name<input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="location.streetName" onBlur={handleBlur} onChange={handleChange} value={values.location.streetName} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>City<input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="location.city" onBlur={handleBlur} onChange={handleChange} value={values.location.city} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>State<input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="location.state" onBlur={handleBlur} onChange={handleChange} value={values.location.state} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Country<input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="location.country" onBlur={handleBlur} onChange={handleChange} value={values.location.country} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Zip Code<input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="location.zipcode" onBlur={handleBlur} onChange={handleChange} value={values.location.zipcode} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            {" "}
                                        </div>
                                    </div>
                                    <Button type="submit" text="Add Job" size="lg" style={{ width: "100%" }}>

                                    </Button>
                                    <br />
                                    <br />
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </section>
        </div >
    )
}

export default AddJobs
