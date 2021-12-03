import React, { useState } from 'react'
import Button from '../common/Button'
import { Formik } from 'formik';
import JobPostingsHeader from './JobPostingsHeader';
import axios from 'axios';
import { getCurrentUser, getJwt } from "../../services/auth";
import {apiURL} from '../../config'
import { TextField } from "@material-ui/core";
import * as Yup from "yup";

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

    const SignupSchema = Yup.object().shape({
        jobTitle: Yup.string()
            .min(2, 'Too Short!')
            .max(255, 'Too Long!')
            .required('Required'),
        industry: Yup.string()
            .min(2, 'Too Short!')
            .max(255, 'Too Long!')
            .required('Required'),
        description: Yup.string()
            .min(2, 'Too Short!')
            .required('Required'),
        responsibilities: Yup.string()
            .min(2, 'Too Short!')
            .required('Required'),
        salary: Yup.number()
            .min(0, 'Value cannot be less than 0')
            .required('Required'),
        location : Yup.object().shape({
            streetName: Yup.string()
            .min(2, 'Too Short!')
            .max(255, 'Too Long!')
            .required('Required'),
            city: Yup.string()
            .min(2, 'Too Short!')
            .max(255, 'Too Long!')
            .required('Required'),
            state: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
            country: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
            zipcode: Yup.string()
                .min(2, 'Too Short!')
                .max(8, 'Too Long!')
                .required('Required'),
        }),
    });

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
                                    streetName:"",
                                    city: "",
                                    state: "",
                                    country: "",
                                    zipcode: "",
                                },
                                datePosted: new Date().toISOString(),
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                console.log(values)
                                console.log(user)
                                axios.post(`${apiURL}/employer/api/addJob/${user.companyId}`, { values })
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
                                                <p className="help-block text-danger">
                                                    {errors.jobTitle && touched.jobTitle ? (
                                                        <>{errors.jobTitle}</>
                                                    ) : null}
                                                </p>
                                            </div>
                                            <div className="form-group">
                                                <label style={{ width: "100%" }}>Industry<input required style={{ width: "100%", borderRadius: 10 }} className="form-control" id="industry" type="text" onBlur={handleBlur} onChange={handleChange} value={values.industry} /></label>
                                                <p className="help-block text-danger">
                                                    {errors.industry && touched.industry ? (
                                                        <>{errors.industry}</>
                                                    ) : null}
                                                </p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Responsibilities <input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="responsibilities" onBlur={handleBlur} onChange={handleChange} value={values.responsibilities} /></label>
                                                <p className="help-block text-danger">
                                                    {errors.responsibilities && touched.responsibilities ? (
                                                        <>{errors.responsibilities}</>
                                                    ) : null}
                                                </p>
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
                                                <p className="help-block text-danger">
                                                    {errors.salary && touched.salary ? (
                                                        <>{errors.salary}</>
                                                    ) : null}
                                                </p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Description<input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="description" onBlur={handleBlur} onChange={handleChange} value={values.description} /></label>
                                                <p className="help-block text-danger">
                                                    {errors.description && touched.description ? (
                                                        <>{errors.description}</>
                                                    ) : null}
                                                </p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Street Name<input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="location.streetName" onBlur={handleBlur} onChange={handleChange} value={values.location.streetName} /></label>
                                                <p className="help-block text-danger">
                                                    {errors.location && errors.location.streetName && touched.location && touched.location.streetName ? (
                                                        <>{errors.location.streetName}</>
                                                    ) : null}
                                                </p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>City<input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="location.city" onBlur={handleBlur} onChange={handleChange} value={values.location.city} /></label>
                                                <p className="help-block text-danger">
                                                    {errors.location && errors.location.city && touched.location && touched.location.city ? (
                                                        <>{errors.location.city}</>
                                                    ) : null}
                                                </p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>State<input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="location.state" onBlur={handleBlur} onChange={handleChange} value={values.location.state} /></label>
                                                <p className="help-block text-danger">
                                                    {errors.location && errors.location.state && touched.location && touched.location.state ? (
                                                        <>{errors.location.state}</>
                                                    ) : null}
                                                </p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Country<input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="location.country" onBlur={handleBlur} onChange={handleChange} value={values.location.country} /></label>
                                                <p className="help-block text-danger">
                                                    {errors.location && errors.location.country && touched.location && touched.location.country ? (
                                                        <>{errors.location.country}</>
                                                    ) : null}
                                                </p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Zip Code<input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="location.zipcode" onBlur={handleBlur} onChange={handleChange} value={values.location.zipcode} /></label>
                                                <p className="help-block text-danger">
                                                    {errors.location && errors.location.zipcode && touched.location && touched.location.zipcode ? (
                                                        <>{errors.location.zipcode}</>
                                                    ) : null}
                                                </p>
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
