import React, { useState } from 'react'
import Button from '../common/Button'
import { Formik } from 'formik';
import EmployerProfileHeader from "./EmployerProfileHeader"

const EmployerDetails = () => {
    var employerData = {
        name: "employerData.name",
        role: "employerData.role",
        address: {
            streetName: "employerData.address.streetName",
            city: "employerData.address.city",
            state: "employerData.address.state",
            country: "employerData.address.country",
            zipcode: "employerData.address.zipcode",
        }
    }
    return (employerData.name ?
        <div className="container">
            <section className="page-section" id="about">
                <div style={{ justifyContent: 'center' }}>


                    <div className="row" style={{ justifyContent: 'center' }}>
                        <Formik
                            style={{ width: '40%' }}
                            initialValues={{
                                name: employerData.name,
                                role: employerData.role,
                                address: employerData.address,
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
                                    <h4 className="font-weight-normal" style={{ fontFamily: 'UberMoveText-Medium,Helvetica,sans-serif' }}> Update Employer Information</h4>
                                    <br />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label style={{ width: "100%" }}>Name<input style={{ width: "100%", borderRadius: 10 }} className="form-control" id="name" type="text" onBlur={handleBlur} onChange={handleChange} value={values.name} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Role <input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="role" onBlur={handleBlur} onChange={handleChange} value={values.role} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>

                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Street Name<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="address.streetName" onBlur={handleBlur} onChange={handleChange} value={values.address.streetName} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>City<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="address.city" onBlur={handleBlur} onChange={handleChange} value={values.address.city} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>State<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="address.state" onBlur={handleBlur} onChange={handleChange} value={values.address.state} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Country<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="address.country" onBlur={handleBlur} onChange={handleChange} value={values.address.country} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Zip Code<input type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="address.zipcode" onBlur={handleBlur} onChange={handleChange} value={values.address.zipcode} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            {" "}
                                        </div>
                                    </div>
                                    <Button type="submit" text="Update Employer Info" size="lg" style={{ width: "100%" }}>
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

export default EmployerDetails
