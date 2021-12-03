import React, { useState, useEffect } from 'react'
import Button from '../common/Button'
import { Formik } from 'formik';
import axios from 'axios';
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory, useParams } from 'react-router-dom'
import S3FileUpload from "react-s3";
import { companyLogoConfig } from '../../config'
const AddNewCompany = () => {
    const history = useHistory()
    const [logo, setLogo] = useState([])
    return (
        <div className="container">
            <section className="page-section" id="about">
                <div style={{ justifyContent: 'center' }}>
                    <div className="row" style={{ justifyContent: 'center' }}>
                        <Formik
                            style={{ width: '40%' }}
                            initialValues={{
                                about: "",
                                name: "",
                                ceo: "",
                                founded: "",
                                workScore: 0,
                                happinessScore: 0,
                                learningScore: 0,
                                appreciationScore: 0,
                                companySize: 0,
                                revenue: 0,
                                industry: "",
                                description: "",
                                mission: "",
                                values: "",
                                workCulture: "",
                                vision: "",
                                companyType: "",
                                headQuarters: {
                                    streetName: "",
                                    city: "",
                                    state: "",
                                    country: "",
                                    zipcode: "",
                                },
                                websiteURL: "",
                                photos: [],
                                logo: ""
                            }}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                console.log(logo)
                                S3FileUpload.uploadFile(logo, companyLogoConfig)
                                    .then((data) => {
                                        values.logo = data.location
                                        console.log(data.location)
                                        axios.post("http://localhost:3900/employer/api/addCompanyDetails", { values })
                                            .then(response => {
                                                console.log(response)
                                                if (response.status != 200) {
                                                    // M.toast({ html: response.statusText, classes: "#c62828 red darken-3" })
                                                }
                                                else {
                                                    // M.toast({ html: "Added Company Successfully", classes: "#43a047 green darken-1" })
                                                    history.push("/employer")
                                                }
                                            }).catch(err => {
                                                console.log(err)
                                            })
                                    })
                                    .catch((err) => {
                                        alert(err);
                                    });

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
                                <form id="contactForm" style={{ width: '80%' }} name="sentMessage" onSubmit={handleSubmit}>

                                    <h4 className="font-weight-normal" style={{ fontFamily: 'UberMoveText-Medium,Helvetica,sans-serif' }}> Link Employer to a Company</h4>
                                    <br />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label style={{ width: "100%" }}>Name<input required style={{ width: "100%", borderRadius: 10 }} className="form-control" id="name" type="text" onBlur={handleBlur} onChange={handleChange} value={values.name} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>About <input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="about" onBlur={handleBlur} onChange={handleChange} value={values.about} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>CEO <input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="ceo" onBlur={handleBlur} onChange={handleChange} value={values.ceo} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group">
                                                <label style={{ width: "100%" }}>Founded<input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="founded" onBlur={handleBlur} onChange={handleChange} value={values.founded} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Work Score<input required type="number" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="workScore" onBlur={handleBlur} onChange={handleChange} value={values.workScore} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Happiness Score<input required type="number" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="happinessScore" onBlur={handleBlur} onChange={handleChange} value={values.happinessScore} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Learning Score<input required type="number" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="learningScore" onBlur={handleBlur} onChange={handleChange} value={values.learningScore} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Appreciation Score<input required type="number" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="appreciationScore" onBlur={handleBlur} onChange={handleChange} value={values.appreciationScore} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Company Size<input required type="number" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="companySize" onBlur={handleBlur} onChange={handleChange} value={values.companySize} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Revenue<input required type="number" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="revenue" onBlur={handleBlur} onChange={handleChange} value={values.revenue} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Industry <input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="industry" onBlur={handleBlur} onChange={handleChange} value={values.industry} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Description <input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="description" onBlur={handleBlur} onChange={handleChange} value={values.description} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group">
                                                <label style={{ width: "100%" }}>Mission<input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="mission" onBlur={handleBlur} onChange={handleChange} value={values.mission} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Values<input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="values" onBlur={handleBlur} onChange={handleChange} value={values.values} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Work Culture <input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="workCulture" onBlur={handleBlur} onChange={handleChange} value={values.workCulture} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group">
                                                <label style={{ width: "100%" }}>Vision<input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="vision" onBlur={handleBlur} onChange={handleChange} value={values.vision} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Company Type<input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="companyType" onBlur={handleBlur} onChange={handleChange} value={values.companyType} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>

                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Street Name<input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="headQuarters.streetName" onBlur={handleBlur} onChange={handleChange} value={values.headQuarters.streetName} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>City<input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="headQuarters.city" onBlur={handleBlur} onChange={handleChange} value={values.headQuarters.city} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>State<input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="headQuarters.state" onBlur={handleBlur} onChange={handleChange} value={values.headQuarters.state} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Country<input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="headQuarters.country" onBlur={handleBlur} onChange={handleChange} value={values.headQuarters.country} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Zip Code<input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="headQuarters.zipcode" onBlur={handleBlur} onChange={handleChange} value={values.headQuarters.zipcode} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Website <input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="websiteURL" onBlur={handleBlur} onChange={handleChange} value={values.websiteURL} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Upload Logo <input required type="file" style={{ width: "100%", borderRadius: 0 }} className="form-control" onBlur={handleBlur} onChange={(e) => setLogo(e.target.files[0])} /></label>
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
                        {" "}
                        <Link
                            to="/employer/addNewCompany"
                            className="link"
                            style={{ color: "black" }}
                        >
                            <Button text="Add New Company and link" size="lg" style={{ width: "100%" }}></Button>
                        </Link>

                    </div>
                </div>
            </section >
        </div >
    )
}

export default AddNewCompany
