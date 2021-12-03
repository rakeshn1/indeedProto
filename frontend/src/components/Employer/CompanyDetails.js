import React, { useEffect, useState } from 'react'
import Button from '../common/Button'
import { Formik } from 'formik';
import EmployerProfileHeader from "./EmployerProfileHeader"
import { getCurrentUser, getJwt } from "../../services/auth";
import axios from 'axios'
const CompanyDetails = () => {
    const user = getCurrentUser();
    // var employerData = {
    //     website: "employerData.name",
    //     companySize: "0",
    //     companyType: "employerData.companyType",
    //     revenue: "0",
    //     headquarters: {
    //         streetName: "employerData.headquarters.streetName",
    //         city: "employerData.headquarters.city",
    //         state: "employerData.headquarters.state",
    //         country: "employerData.headquarters.country",
    //         zipcode: "employerData.headquarters.zipcode",
    //     },
    //     industry: "employerData.industry",
    //     founded: "employerData.founded",
    //     missionAndVision: "employerData.missionAndVision",
    //     ceoName: "employerData.ceoName",
    //}

    const [companyData, setCompanyData] = useState(null)
    useEffect(() => {
        axios.get(`http://localhost:3900/employer/api/getCompanyDetails/${user.companyId}`)
            .then((response) => {
                console.log(response)
                if (response.status != 200) {
                    // M.toast({ html: response.statusText, classes: "#c62828 red darken-3" })
                }
                else {
                    // M.toast({ html: "Added Company Successfully", classes: "#43a047 green darken-1" })
                    console.log(response.data)
                    setCompanyData(response.data)
                }
            }).catch(err => {
                console.log(err)
            })
    }, [])
    return (companyData &&
        <div className="container">
            <section className="page-section" id="about">
                <div style={{ justifyContent: 'center' }}>
                    <div className="row" style={{ justifyContent: 'center' }}>
                        <Formik
                            style={{ width: '40%' }}
                            initialValues={{
                                websiteURL: companyData.websiteURL,
                                companySize: companyData.companySize,
                                companyType: companyData.companyType,
                                revenue: companyData.revenue,
                                headQuarters: companyData.headQuarters,
                                industry: companyData.industry,
                                founded: companyData.founded,
                                mission: companyData.mission,
                                vision: companyData.vision,
                                ceo: companyData.ceo,
                            }}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                console.log(values)


                                axios.put(`http://localhost:3900/employer/api/updateCompanyDetails/${user.companyId}`, { values })
                                    .then(response => {
                                        console.log(response)
                                        if (response.status != 200) {
                                            alert("Update Failed")
                                        }
                                        else {
                                            alert("Update Success")

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
                                        <EmployerProfileHeader />
                                    </div>
                                    <h4 className="font-weight-normal" style={{ fontFamily: 'UberMoveText-Medium,Helvetica,sans-serif' }}> Update Company Information</h4>
                                    <br />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label style={{ width: "100%" }}>Website<input style={{ width: "100%", borderRadius: 10 }} className="form-control" id="websiteURL" type="text" onBlur={handleBlur} onChange={handleChange} value={values.websiteURL} /></label>
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
                                                <label style={{ width: "100%" }}>Street Name<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="headQuarters.streetName" onBlur={handleBlur} onChange={handleChange} value={values.headQuarters.streetName} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>City<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="headQuarters.city" onBlur={handleBlur} onChange={handleChange} value={values.headQuarters.city} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>State<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="headQuarters.state" onBlur={handleBlur} onChange={handleChange} value={values.headQuarters.state} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Country<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="headQuarters.country" onBlur={handleBlur} onChange={handleChange} value={values.headQuarters.country} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Zip Code<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="headQuarters.zipcode" onBlur={handleBlur} onChange={handleChange} value={values.headQuarters.zipcode} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            {" "}
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Industry<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="industry" onBlur={handleBlur} onChange={handleChange} value={values.industry} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Founded <input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="founded" onBlur={handleBlur} onChange={handleChange} value={values.founded} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Mission<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="mission" onBlur={handleBlur} onChange={handleChange} value={values.mission} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Vision<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="vision" onBlur={handleBlur} onChange={handleChange} value={values.vision} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>CEO Name<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="ceo" onBlur={handleBlur} onChange={handleChange} value={values.ceo} /></label>
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
        </div >
    )
}

export default CompanyDetails
