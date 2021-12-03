import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import { Formik } from "formik";
import EmployerProfileHeader from "./EmployerProfileHeader";
import { getCurrentUser, getJwt } from "../../services/auth";
import axios from "axios";
import * as Yup from "yup";
import { apiURL } from '../../config'
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
  const SignupSchema = Yup.object().shape({
    ceo: Yup.string()
      .min(2, "Too Short!")
      .max(30, "Too Long!")
      .required("Required"),
    industry: Yup.string()
      .min(2, "Too Short!")
      .max(255, "Too Long!")
      .required("Required"),
    revenue: Yup.number()
      .min(0, "Value cannot be less than 0")
      .required("Required"),
    mission: Yup.string()
      .min(2, "Too Short!")
      .max(255, "Too Long!")
      .required("Required"),
    vision: Yup.string()
      .min(2, "Too Short!")
      .max(255, "Too Long!")
      .required("Required"),
    companySize: Yup.number()
      .min(0, "Value cannot be less than 0")
      .required("Required"),
    founded: Yup.number()
      .min(0, "Value cannot be less than 0")
      .max(9999, "cannot be longer that this")
      .required("Required"),
    companyType: Yup.string()
      .min(2, "Too Short!")
      .max(255, "Too Long!")
      .required("Required"),
    headQuarters: Yup.object().shape({
      streetName: Yup.string()
        .min(2, "Too Short!")
        .max(255, "Too Long!")
        .required("Required"),
      city: Yup.string()
        .min(2, "Too Short!")
        .max(255, "Too Long!")
        .required("Required"),
      state: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
      country: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
      zipcode: Yup.string()
        .min(2, "Too Short!")
        .max(8, "Too Long!")
        .required("Required"),
    }),
    websiteURL: Yup.string()
      .min(2, "Too Short!")
      .max(1024, "Too Long!")
      .required("Required"),
  });

  const [companyData, setCompanyData] = useState(null);
  useEffect(() => {
    axios
      .get(
        `${apiURL}/employer/api/getCompanyDetails/${user.companyId}`
      )
      .then((response) => {
        console.log(response);
        if (response.status != 200) {
          // M.toast({ html: response.statusText, classes: "#c62828 red darken-3" })
        } else {
          // M.toast({ html: "Added Company Successfully", classes: "#43a047 green darken-1" })
          console.log(response.data);
          setCompanyData(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    companyData && (
      <div className="container">
        <section className="page-section" id="about">
          <div style={{ justifyContent: "center" }}>
            <div className="row" style={{ justifyContent: "center" }}>
              <Formik
                style={{ width: "40%" }}
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
                validationSchema={SignupSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  console.log(values);

                  axios
                    .put(
                      `${apiURL}/employer/api/updateCompanyDetails/${user.companyId}`,
                      { values }
                    )
                    .then((response) => {
                      console.log(response);
                      if (response.status != 200) {
                        alert("Update Failed");
                      } else {
                        alert("Update Success");
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values,
                }) => (
                  <form
                    id="contactForm"
                    style={{ width: "40%" }}
                    name="sentMessage"
                    onSubmit={handleSubmit}
                  >
                    <div style={{ justifyContent: "center", padding: 40 }}>
                      <EmployerProfileHeader />
                    </div>
                    <h4
                      className="font-weight-normal"
                      style={{
                        fontFamily: "UberMoveText-Medium,Helvetica,sans-serif",
                      }}
                    >
                      {" "}
                      Update Company Information
                    </h4>
                    <br />
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label style={{ width: "100%" }}>
                            Website
                            <input
                              style={{ width: "100%", borderRadius: 10 }}
                              className="form-control"
                              id="websiteURL"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.websiteURL}
                            />
                          </label>
                          <p className="help-block text-danger">
                            {errors.websiteURL && touched.websiteURL ? (
                              <>{errors.websiteURL}</>
                            ) : null}
                          </p>
                        </div>
                        <div className="form-group">
                          <label style={{ width: "100%" }}>
                            Company Size{" "}
                            <input
                              type="text"
                              style={{ width: "100%", borderRadius: 10 }}
                              className="form-control"
                              id="companySize"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.companySize}
                            />
                          </label>
                          <p className="help-block text-danger">
                            {errors.companySize && touched.companySize ? (
                              <div>{errors.companySize}</div>
                            ) : null}
                          </p>
                        </div>
                        <div className="form-group">
                          <label style={{ width: "100%" }}>
                            Company Type{" "}
                            <input
                              type="text"
                              style={{ width: "100%", borderRadius: 10 }}
                              className="form-control"
                              id="companyType"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.companyType}
                            />
                          </label>
                          <p className="help-block text-danger">
                            {errors.companyType && touched.companyType ? (
                              <>{errors.companyType}</>
                            ) : null}
                          </p>
                        </div>
                        <div className="form-group">
                          <label style={{ width: "100%" }}>
                            Revenue
                            <input
                              type="text"
                              style={{ width: "100%", borderRadius: 10 }}
                              className="form-control"
                              id="revenue"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.revenue}
                            />
                          </label>
                          <p className="help-block text-danger">
                            {errors.revenue && touched.revenue ? (
                              <div>{errors.revenue}</div>
                            ) : null}
                          </p>
                        </div>
                        <div className="form-group">
                          <label style={{ width: "100%" }}>
                            Street Name
                            <input
                              type="text"
                              style={{ width: "100%", borderRadius: 10 }}
                              className="form-control"
                              id="headQuarters.streetName"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.headQuarters.streetName}
                            />
                          </label>
                          <p className="help-block text-danger">
                            {errors.headQuarters &&
                              errors.headQuarters.streetName &&
                              touched.headQuarters &&
                              touched.headQuarters.streetName ? (
                              <>{errors.headQuarters.streetName}</>
                            ) : null}
                          </p>
                        </div>
                        <div className="form-group">
                          <label style={{ width: "100%" }}>
                            City
                            <input
                              type="text"
                              style={{ width: "100%", borderRadius: 10 }}
                              className="form-control"
                              id="headQuarters.city"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.headQuarters.city}
                            />
                          </label>
                          <p className="help-block text-danger">
                            {errors.headQuarters &&
                              errors.headQuarters.city &&
                              touched.headQuarters &&
                              touched.headQuarters.city ? (
                              <>{errors.headQuarters.city}</>
                            ) : null}
                          </p>
                        </div>
                        <div className="form-group">
                          <label style={{ width: "100%" }}>
                            State
                            <input
                              type="text"
                              style={{ width: "100%", borderRadius: 10 }}
                              className="form-control"
                              id="headQuarters.state"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.headQuarters.state}
                            />
                          </label>
                          <p className="help-block text-danger">
                            {errors.headQuarters &&
                              errors.headQuarters.state &&
                              touched.headQuarters &&
                              touched.headQuarters.state ? (
                              <>{errors.headQuarters.state}</>
                            ) : null}
                          </p>
                        </div>
                        <div className="form-group">
                          <label style={{ width: "100%" }}>
                            Country
                            <input
                              type="text"
                              style={{ width: "100%", borderRadius: 10 }}
                              className="form-control"
                              id="headQuarters.country"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.headQuarters.country}
                            />
                          </label>
                          <p className="help-block text-danger">
                            {errors.headQuarters &&
                              errors.headQuarters.country &&
                              touched.headQuarters &&
                              touched.headQuarters.country ? (
                              <>{errors.headQuarters.country}</>
                            ) : null}
                          </p>
                        </div>
                        <div className="form-group">
                          <label style={{ width: "100%" }}>
                            Zip Code
                            <input
                              type="text"
                              style={{ width: "100%", borderRadius: 10 }}
                              className="form-control"
                              id="headQuarters.zipcode"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.headQuarters.zipcode}
                            />
                          </label>
                          <p className="help-block text-danger">
                            {errors.headQuarters &&
                              errors.headQuarters.zipcode &&
                              touched.headQuarters &&
                              touched.headQuarters.zipcode ? (
                              <>{errors.headQuarters.zipcode}</>
                            ) : null}
                          </p>
                        </div>{" "}
                        <div className="form-group">
                          <label style={{ width: "100%" }}>
                            Industry
                            <input
                              type="text"
                              style={{ width: "100%", borderRadius: 10 }}
                              className="form-control"
                              id="industry"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.industry}
                            />
                          </label>
                          <p className="help-block text-danger">
                            {errors.industry && touched.industry ? (
                              <>{errors.industry}</>
                            ) : null}
                          </p>
                        </div>
                        <div className="form-group">
                          <label style={{ width: "100%" }}>
                            Founded{" "}
                            <input
                              type="text"
                              style={{ width: "100%", borderRadius: 10 }}
                              className="form-control"
                              id="founded"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.founded}
                            />
                          </label>
                          <p className="help-block text-danger">
                            {errors.founded && touched.founded ? (
                              <>{errors.founded}</>
                            ) : null}
                          </p>
                        </div>
                        <div className="form-group">
                          <label style={{ width: "100%" }}>
                            Mission
                            <input
                              type="text"
                              style={{ width: "100%", borderRadius: 10 }}
                              className="form-control"
                              id="mission"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.mission}
                            />
                          </label>
                          <p className="help-block text-danger">
                            {errors.mission && touched.mission ? (
                              <>{errors.mission}</>
                            ) : null}
                          </p>
                        </div>
                        <div className="form-group">
                          <label style={{ width: "100%" }}>
                            Vision
                            <input
                              type="text"
                              style={{ width: "100%", borderRadius: 10 }}
                              className="form-control"
                              id="vision"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.vision}
                            />
                          </label>
                          <p className="help-block text-danger">
                            {errors.vision && touched.vision ? (
                              <>{errors.vision}</>
                            ) : null}
                          </p>
                        </div>
                        <div className="form-group">
                          <label style={{ width: "100%" }}>
                            CEO Name
                            <input
                              type="text"
                              style={{ width: "100%", borderRadius: 10 }}
                              className="form-control"
                              id="ceo"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.ceo}
                            />
                          </label>
                          <p className="help-block text-danger">
                            {errors.ceo && touched.ceo ? (
                              <>{errors.ceo}</>
                            ) : null}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      text="Update Info"
                      size="lg"
                      style={{ width: "100%" }}
                    >
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
      </div>
    )
  );
};

export default CompanyDetails;
