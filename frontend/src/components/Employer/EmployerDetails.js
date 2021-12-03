import React, { useState, useEffect } from 'react'
import Button from '../common/Button'
import { Formik } from 'formik';
import axios from 'axios';
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory, useParams } from 'react-router-dom'
import { getCurrentUser, getJwt } from "../../services/auth";
import EmployerProfileHeader from "./EmployerProfileHeader"
import * as Yup from "yup";
import {apiURL} from '../../config'
const EmployerDetails = () => {
    const [allCompanies, setAllCompanies] = useState([])
    const [employerData, setEmployerData] = useState(null)
    const history = useHistory()
    const user = getCurrentUser();

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        phoneNumber: Yup.string()
            .required("Required")
            .matches(phoneRegExp, 'Phone number is not valid')
            .min(10, "Too short")
            .max(10, "Too long"),
        companyRole: Yup.string()
            .min(2, 'Too Short!')
            .max(30, 'Too Long!')
            .required('Required'),
    });

    useEffect(() => {
        axios.get(`${apiURL}/employer/api/getAllCompanies`)
            .then((response) => {
                console.log(response);
                if (response.status != 200) {
                    alert({ html: response.statusText, classes: "#c62828 red darken-3" });
                } else {
                    console.log(response.data)
                    setAllCompanies(response.data);
                }
            });

        axios.get(`${apiURL}/employer/api/getEmployerDetails/${user._id}`)
            .then((response) => {
                if (response.status != 200) {
                    // M.toast({ html: response.statusText, classes: "#c62828 red darken-3" })
                }
                else {
                    // M.toast({ html: "Added Company Successfully", classes: "#43a047 green darken-1" })
                    console.log(response.data[0])
                    setEmployerData(response.data[0])
                }
            }).catch(err => {
                console.log(err)
            })
    }, [])

    return (employerData &&
        <div className="container">
            <section className="page-section" id="about">
                <div style={{ justifyContent: 'center' }}>
                    <div className="row" style={{ justifyContent: 'center' }}>
                        <Formik
                            style={{ width: '40%' }}
                            initialValues={{
                                firstName: employerData.firstName,
                                lastName: employerData.lastName,
                                phoneNumber: employerData.phoneNumber,
                                companyRole: employerData.companyRole,
                                companyId: employerData.companyId,
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                console.log(values)
                                axios.put(`${apiURL}/employer/api/updateEmployerDetails/${user._id}`, { values })
                                    .then(response => {
                                        console.log(response)
                                        if (response.status != 200) {
                                            alert("Update Failed")
                                        }
                                        else {
                                            alert("Update Success")
                                            history.push("/employer")
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
                                    <h4 className="font-weight-normal" style={{ fontFamily: 'UberMoveText-Medium,Helvetica,sans-serif' }}>Edit Employer Details</h4>
                                    <br />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label style={{ width: "100%" }}>First Name<input required style={{ width: "100%", borderRadius: 10 }} className="form-control" id="firstName" type="text" onBlur={handleBlur} onChange={handleChange} value={values.firstName} /></label>
                                                <p className="help-block text-danger">
                                                    {errors.firstName && touched.firstName ? (
                                                        <>{errors.firstName}</>
                                                    ) : null}
                                                </p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Last Name <input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="lastName" onBlur={handleBlur} onChange={handleChange} value={values.lastName} /></label>
                                                <p className="help-block text-danger">
                                                    {errors.lastName && touched.lastName ? (
                                                        <>{errors.lastName}</>
                                                    ) : null}
                                                </p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Phone <input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="phoneNumber" onBlur={handleBlur} onChange={handleChange} value={values.phoneNumber} /></label>
                                                <p className="help-block text-danger">
                                                    {errors.phoneNumber && touched.phoneNumber ? (
                                                        <>{errors.phoneNumber}</>
                                                    ) : null}
                                                </p>
                                            </div>
                                            <div className="form-group">
                                                <label style={{ width: "100%" }}>Role in the Company<input required type="text" style={{ width: "100%", borderRadius: 10 }} className="form-control" id="companyRole" onBlur={handleBlur} onChange={handleChange} value={values.companyRole} /></label>
                                                <p className="help-block text-danger">
                                                    {errors.companyRole && touched.companyRole ? (
                                                        <>{errors.companyRole}</>
                                                    ) : null}
                                                </p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Select Company</label>

                                            </div>
                                            <TextField
                                                disabled
                                                fullWidth
                                                name="companyId"
                                                size="small"
                                                onChange={handleChange}
                                                required
                                                select
                                                SelectProps={{ native: true }}
                                                value={values.companyId}
                                                variant="outlined"
                                                margin="normal"
                                            >

                                                <option value="" />
                                                {allCompanies.map((option) => (
                                                    <option
                                                        key={option._id}
                                                        value={option._id}
                                                    >
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </TextField>
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


                    </div>
                </div>
            </section >
        </div >
    )
}

export default EmployerDetails
