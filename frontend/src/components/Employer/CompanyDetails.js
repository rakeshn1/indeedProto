import React, { useState } from 'react'
import Button from '../common/Button'
import { Formik } from 'formik';
import EmployerProfileHeader from "./EmployerProfileHeader"
const CompanyDetails = () => {
    var employerData = {
        website: "employerData.name",
        companySize: "0",
        companyType: "employerData.companyType",
        revenue: "0",
        headquarters: {
            streetName: "employerData.headquarters.streetName",
            city: "employerData.headquarters.city",
            state: "employerData.headquarters.state",
            country: "employerData.headquarters.country",
            zipcode: "employerData.headquarters.zipcode",
        },
        industry: "employerData.industry",
        founded: "employerData.founded",
        missionAndVision: "employerData.missionAndVision",
        ceoName: "employerData.ceoName",
    }
    return (employerData.website ?
        <div className="container">
            <section className="page-section" id="about">
                <div style={{ justifyContent: 'center' }}>



                    <div className="row" style={{ justifyContent: 'center' }}>
                        <Formik
                            style={{ width: '40%' }}
                            initialValues={{
                                website: employerData.website,
                                companySize: employerData.companySize,
                                companyType: employerData.companyType,
                                revenue: employerData.revenue,
                                headquarters: employerData.headquarters,
                                industry: employerData.industry,
                                founded: employerData.founded,
                                missionAndVision: employerData.missionAndVision,
                                ceoName: employerData.ceoName,
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
                                        <EmployerProfileHeader />
                                    </div>
                                    <h4 className="font-weight-normal" style={{ fontFamily: 'UberMoveText-Medium,Helvetica,sans-serif' }}> Update Company Information</h4>
                                    <br />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label style={{ width: "100%" }}>Website<input style={{ width: "100%", borderRadius: 10 }} className="form-control" id="website" type="text" onBlur={handleBlur} onChange={handleChange} value={values.website} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Company Size <input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="companySize" onBlur={handleBlur} onChange={handleChange} value={values.companySize} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Company Type <input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="companyType" onBlur={handleBlur} onChange={handleChange} value={values.companyType} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group">
                                                <label style={{ width: "100%" }}>Revenue<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="revenue" onBlur={handleBlur} onChange={handleChange} value={values.revenue} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Street Name<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="headquarters.streetName" onBlur={handleBlur} onChange={handleChange} value={values.headquarters.streetName} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>City<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="headquarters.city" onBlur={handleBlur} onChange={handleChange} value={values.headquarters.city} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>State<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="headquarters.state" onBlur={handleBlur} onChange={handleChange} value={values.headquarters.state} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Country<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="headquarters.country" onBlur={handleBlur} onChange={handleChange} value={values.headquarters.country} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Zip Code<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="headquarters.zipcode" onBlur={handleBlur} onChange={handleChange} value={values.headquarters.zipcode} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            {" "}
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Industry<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="industry" onBlur={handleBlur} onChange={handleChange} value={values.industry} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Founded <input type="date" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="founded" onBlur={handleBlur} onChange={handleChange} value={values.founded} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Mission And Vision<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="missionAndVision" onBlur={handleBlur} onChange={handleChange} value={values.missionAndVision} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>CEO Name<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="ceoName" onBlur={handleBlur} onChange={handleChange} value={values.ceoName} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                        </div>
                                    </div>
                                    <Button type="submit" text="Update Info" size="lg" style={{ width: "100%" }}>
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

export default CompanyDetails
