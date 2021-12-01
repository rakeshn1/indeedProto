import React, { useState } from 'react'
import Button from '../common/Button'
import { Formik } from 'formik';
import JobPostingsHeader from './JobPostingsHeader';

const AddJobs = () => {
    var employerData = {
        companyName: "employerData.companyName",
        jobTitle: "employerData.jobTitle",
        industry: "employerData.industry",
        jobType: "employerData.jobTitle",
        salary: "employerData.salary",
        description: "employerData.description",
        location: {
            streetName: "employerData.location.streetName",
            city: "employerData.location.city",
            state: "employerData.location.state",
            country: "employerData.location.country",
            zipcode: "employerData.location.zipcode",
        }
    }
    return (employerData.companyName ?
        <div className="container">
            <section className="page-section" id="about">
                <div style={{ justifyContent: 'center' }}>


                    <div className="row" style={{ justifyContent: 'center' }}>
                        <Formik
                            style={{ width: '40%' }}
                            initialValues={{
                                companyName: employerData.companyName,
                                jobTitle: employerData.jobTitle,
                                industry: employerData.industry,
                                jobType: employerData.jobTitle,
                                salary: employerData.salary,
                                description: employerData.description,
                                location: employerData.location
                            }}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                console.log(values)

                                //const companyId = JSON.parse(localStorage.getItem("company"))[0]._id
                                // axios.post(`employer/api/updateCompanyDetails/${companyId}`, { values })
                                //     .then(response => {
                                //         console.log(response)
                                //         if (response.status != 200) {
                                //             M.toast({ html: response.statusText, classes: "#c62828 red darken-3" })
                                //         }
                                //         else {
                                //             M.toast({ html: "Updated Customer details successfully", classes: "#43a047 green darken-1" })
                                //         }
                                //     }).catch(err => {
                                //         console.log(err)
                                //     })

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
                                    <h4 className="font-weight-normal" style={{ fontFamily: 'UberMoveText-Medium,Helvetica,sans-serif' }}> Update Employer Information</h4>
                                    <br />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label style={{ width: "100%" }}>Company Name<input style={{ width: "100%", borderRadius: 10 }} className="form-control" id="companyName" type="text" onBlur={handleBlur} onChange={handleChange} value={values.companyName} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Job Title <input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="jobTitle" onBlur={handleBlur} onChange={handleChange} value={values.jobTitle} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group">
                                                <label style={{ width: "100%" }}>Industry<input style={{ width: "100%", borderRadius: 10 }} className="form-control" id="industry" type="text" onBlur={handleBlur} onChange={handleChange} value={values.companyName} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Job Type <input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="jobType" onBlur={handleBlur} onChange={handleChange} value={values.jobTitle} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>

                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Salary<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="salary" onBlur={handleBlur} onChange={handleChange} value={values.salary} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Description<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="description" onBlur={handleBlur} onChange={handleChange} value={values.description} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Street Name<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="address.streetName" onBlur={handleBlur} onChange={handleChange} value={values.location.streetName} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>City<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="address.city" onBlur={handleBlur} onChange={handleChange} value={values.location.city} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>State<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="address.state" onBlur={handleBlur} onChange={handleChange} value={values.location.state} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Country<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="address.country" onBlur={handleBlur} onChange={handleChange} value={values.location.country} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Zip Code<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="address.zipcode" onBlur={handleBlur} onChange={handleChange} value={values.location.zipcode} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            {" "}
                                        </div>
                                    </div>
                                    <Button type="submit" text="Add Job" size="lg" style={{ width: "100%" }}>
                                        Update
                                    </Button>
                                    <br />
                                    <br />
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </section>
        </div > : <h1></h1>
    )
}

export default AddJobs
