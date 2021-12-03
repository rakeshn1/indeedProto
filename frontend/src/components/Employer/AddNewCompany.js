import React, { useState, useEffect } from "react";
import Button from "../common/Button";
import { Formik } from "formik";
import axios from "axios";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import S3FileUpload from "react-s3";
import { companyLogoConfig } from "../../config";
import * as Yup from "yup";

const AddNewCompany = () => {
  const history = useHistory();
  const [logo, setLogo] = useState([]);

  const SignupSchema = Yup.object().shape({
    about: Yup.string().min(2, "Too Short!").required("Required"),
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    ceo: Yup.string()
      .min(2, "Too Short!")
      .max(30, "Too Long!")
      .required("Required"),
    industry: Yup.string()
      .min(2, "Too Short!")
      .max(255, "Too Long!")
      .required("Required"),
    description: Yup.string()
      .min(2, "Too Short!")
      .max(255, "Too Long!")
      .required("Required"),
    workScore: Yup.number()
      .min(0, "Value cannot be less than 0")
      .max(100, "Value cannot be more than 100")
      .required("Required"),
    happinessScore: Yup.number()
      .min(0, "Value cannot be less than 0")
      .max(100, "Value cannot be more than 100")
      .required("Required"),
    appreciationScore: Yup.number()
      .min(0, "Value cannot be less than 0")
      .max(100, "Value cannot be more than 100")
      .required("Required"),
    companySize: Yup.number()
      .min(0, "Value cannot be less than 0")
      .required("Required"),
    revenue: Yup.number()
      .min(0, "Value cannot be less than 0")
      .required("Required"),
    mission: Yup.string()
      .min(2, "Too Short!")
      .max(255, "Too Long!")
      .required("Required"),
    founded: Yup.number()
      .min(0, "Value cannot be less than 0")
      .max(9999, "cannot be longer that this")
      .required("Required"),
    values: Yup.string()
      .min(2, "Too Short!")
      .max(255, "Too Long!")
      .required("Required"),
    workCulture: Yup.string()
      .min(2, "Too Short!")
      .max(255, "Too Long!")
      .required("Required"),
    vision: Yup.string()
      .min(2, "Too Short!")
      .max(255, "Too Long!")
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

  return (
    <div className="container">
      <section className="page-section" id="about">
        <div style={{ justifyContent: "center" }}>
          <div className="row" style={{ justifyContent: "center" }}>
            <Formik
              style={{ width: "40%" }}
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
                logo: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log(logo);
                S3FileUpload.uploadFile(logo, companyLogoConfig)
                  .then((data) => {
                    values.logo = data.location;
                    console.log(data.location);
                    axios
                      .post(
                        "http://localhost:3900/employer/api/addCompanyDetails",
                        { values }
                      )
                      .then((response) => {
                        console.log(response);
                        if (response.status != 200) {
                          // M.toast({ html: response.statusText, classes: "#c62828 red darken-3" })
                        } else {
                          // M.toast({ html: "Added Company Successfully", classes: "#43a047 green darken-1" })
                          history.push("/employer");
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  })
                  .catch((err) => {
                    alert(err);
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
                  style={{ width: "80%" }}
                  name="sentMessage"
                  onSubmit={handleSubmit}
                >
                  <h4
                    className="font-weight-normal"
                    style={{
                      fontFamily: "UberMoveText-Medium,Helvetica,sans-serif",
                    }}
                  >
                    {" "}
                    Link Employer to a Company
                  </h4>
                  <br />
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label style={{ width: "100%" }}>
                          Name
                          <input
                            required
                            style={{ width: "100%", borderRadius: 10 }}
                            className="form-control"
                            id="name"
                            type="text"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.name}
                          />
                        </label>
                        <p className="help-block text-danger">
                          {errors.name && touched.name ? (
                            <>{errors.name}</>
                          ) : null}
                        </p>
                      </div>
                      <div className="form-group">
                        <label style={{ width: "100%" }}>
                          About{" "}
                          <input
                            required
                            type="text"
                            style={{ width: "100%", borderRadius: 10 }}
                            className="form-control"
                            id="about"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.about}
                          />
                        </label>
                        <p className="help-block text-danger">
                          {errors.about && touched.about ? (
                            <>{errors.about}</>
                          ) : null}
                        </p>
                      </div>
                      <div className="form-group">
                        <label style={{ width: "100%" }}>
                          CEO{" "}
                          <input
                            required
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
                          {errors.ceo && touched.ceo ? <>{errors.ceo}</> : null}
                        </p>
                      </div>
                      <div className="form-group">
                        <label style={{ width: "100%" }}>
                          Founded
                          <input
                            required
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
                          Work Score
                          <input
                            required
                            type="number"
                            style={{ width: "100%", borderRadius: 10 }}
                            className="form-control"
                            id="workScore"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.workScore}
                          />
                        </label>
                        <p className="help-block text-danger">
                          {errors.workScore && touched.workScore ? (
                            <div>{errors.workScore}</div>
                          ) : null}
                        </p>
                      </div>
                      <div className="form-group">
                        <label style={{ width: "100%" }}>
                          Happiness Score
                          <input
                            required
                            type="number"
                            style={{ width: "100%", borderRadius: 10 }}
                            className="form-control"
                            id="happinessScore"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.happinessScore}
                          />
                        </label>
                        <p className="help-block text-danger">
                          {errors.happinessScore && touched.happinessScore ? (
                            <div>{errors.happinessScore}</div>
                          ) : null}
                        </p>
                      </div>
                      <div className="form-group">
                        <label style={{ width: "100%" }}>
                          Learning Score
                          <input
                            required
                            type="number"
                            style={{ width: "100%", borderRadius: 10 }}
                            className="form-control"
                            id="learningScore"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.learningScore}
                          />
                        </label>
                        <p className="help-block text-danger">
                          {errors.learningScore && touched.learningScore ? (
                            <div>{errors.learningScore}</div>
                          ) : null}
                        </p>
                      </div>
                      <div className="form-group">
                        <label style={{ width: "100%" }}>
                          Appreciation Score
                          <input
                            required
                            type="number"
                            style={{ width: "100%", borderRadius: 10 }}
                            className="form-control"
                            id="appreciationScore"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.appreciationScore}
                          />
                        </label>
                        <p className="help-block text-danger">
                          {errors.appreciationScore &&
                          touched.appreciationScore ? (
                            <div>{errors.appreciationScore}</div>
                          ) : null}
                        </p>
                      </div>
                      <div className="form-group">
                        <label style={{ width: "100%" }}>
                          Company Size
                          <input
                            required
                            type="number"
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
                          Revenue
                          <input
                            required
                            type="number"
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
                          Industry{" "}
                          <input
                            required
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
                          Description{" "}
                          <input
                            required
                            type="text"
                            style={{ width: "100%", borderRadius: 10 }}
                            className="form-control"
                            id="description"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.description}
                          />
                        </label>
                        <p className="help-block text-danger">
                          {errors.description && touched.description ? (
                            <>{errors.description}</>
                          ) : null}
                        </p>
                      </div>
                      <div className="form-group">
                        <label style={{ width: "100%" }}>
                          Mission
                          <input
                            required
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
                          Values
                          <input
                            required
                            type="text"
                            style={{ width: "100%", borderRadius: 10 }}
                            className="form-control"
                            id="values"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.values}
                          />
                        </label>
                        <p className="help-block text-danger">
                          {errors.values && touched.values ? (
                            <div>{errors.values}</div>
                          ) : null}
                        </p>
                      </div>
                      <div className="form-group">
                        <label style={{ width: "100%" }}>
                          Work Culture{" "}
                          <input
                            required
                            type="text"
                            style={{ width: "100%", borderRadius: 10 }}
                            className="form-control"
                            id="workCulture"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.workCulture}
                          />
                        </label>
                        <p className="help-block text-danger">
                          {errors.workCulture && touched.workCulture ? (
                            <>{errors.workCulture}</>
                          ) : null}
                        </p>
                      </div>
                      <div className="form-group">
                        <label style={{ width: "100%" }}>
                          Vision
                          <input
                            required
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
                          Company Type
                          <input
                            required
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
                          Street Name
                          <input
                            required
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
                            required
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
                            required
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
                            required
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
                            required
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
                      </div>
                      <div className="form-group">
                        <label style={{ width: "100%" }}>
                          Website{" "}
                          <input
                            required
                            type="text"
                            style={{ width: "100%", borderRadius: 10 }}
                            className="form-control"
                            id="websiteURL"
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
                          Upload Logo{" "}
                          <input
                            required
                            type="file"
                            style={{ width: "100%", borderRadius: 0 }}
                            className="form-control"
                            onBlur={handleBlur}
                            onChange={(e) => setLogo(e.target.files[0])}
                          />
                        </label>
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
            </Formik>{" "}
            <Link
              to="/employer/addNewCompany"
              className="link"
              style={{ color: "black" }}
            >
              <Button
                text="Add New Company and link"
                size="lg"
                style={{ width: "100%" }}
              ></Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddNewCompany;
