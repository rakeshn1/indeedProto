import React, { useCallback, useEffect, useState, useMemo } from "react";
import Select from "../../common/Select";
import Button from "../../common/Button";
import Switch from "react-switch";
import { Formik, Field, Form } from "formik";
import "../../../styles/companyStyles.css";

const CompanySalaryForm = (props) => {
  const submitFormHandler = useCallback(() => {}, []);
  const [currentPage, setPage] = useState(0);

  const endDateOptions = useMemo(() => {
    const options = [];
    const currentYear = Number(new Date().getFullYear());
    for (let i = currentYear; i >= currentYear - 100; --i) {
      options.push(i.toString());
    }
    return options;
  }, []);

  return (
    <Formik
      style={{ width: "40%" }}
      initialValues={{
        benefits: [],
        companyId: "companyId",
        endDate: endDateOptions[0],
        isJobSeekerCurrentCompany: true,
        jobSeekerId: "jobSeekerId",
        jobTitle: "",
        jobLocation: "",
        hasOtherBenefits: false,
        otherBenefit: "",
        salary: 0,
        yearsOfRelevantExperience: 0,
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, values }) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Form id="salary-form" style={{ width: "fit-content" }}>
            <br />
            <div className="row">
              <div className="col-md-12">
                {currentPage === 0 ? (
                  <>
                    <h4
                      className="font-weight-normal"
                      style={{
                        fontFamily: "UberMoveText-Medium,Helvetica,sans-serif",
                      }}
                    >
                      Can you tell us about yourself? <br />
                      <h6>
                        Let’s start building your report with basics, like your
                        job title, location and company.
                      </h6>
                    </h4>
                    <div className="form-group">
                      <label style={{ width: "100%" }}>Job Title</label>
                      <Field name="jobTitle" type="text" />
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <label style={{ width: "100%" }}>Job Location</label>
                      <Field name="jobLocation" type="text" />
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <label style={{ width: "100%" }}>
                        Are you currently working at this company?
                        <Field name="isJobSeekerCurrentCompany" type="checkbox">
                          {({ field: { value }, form: { setFieldValue } }) => (
                            <div>
                              <Switch
                                checked={value}
                                onChange={(checked) =>
                                  setFieldValue(
                                    "isJobSeekerCurrentCompany",
                                    checked
                                  )
                                }
                              />
                            </div>
                          )}
                        </Field>
                      </label>
                      <p className="help-block text-danger"></p>
                    </div>
                    {!values.isJobSeekerCurrentCompany && (
                      <div className="form-group">
                        <Field name="endDate">
                          {({ field: { value }, form: { setFieldValue } }) => (
                            <div>
                              <Select
                                label="End Date"
                                id="endDate"
                                name="endDate"
                                options={endDateOptions}
                                className="me-5 medium rounded-corners"
                                labelclass="label"
                                onChange={(e) =>
                                  setFieldValue("endDate", e.target.value)
                                }
                                required
                              />
                            </div>
                          )}
                        </Field>
                        <p className="help-block text-danger"></p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <h4
                      className="font-weight-normal"
                      style={{
                        fontFamily: "UberMoveText-Medium,Helvetica,sans-serif",
                      }}
                    >
                      Pay and benefits <br />
                      <h6>Your anonymous pay will help other job seekers.</h6>
                    </h4>
                    <div className="form-group">
                      <div role="group" aria-labelledby="checkbox-group">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Field
                            type="checkbox"
                            name="benefits"
                            value="Paid time off"
                            style={{ width: "auto", marginRight: 15 }}
                          />
                          <div>Paid time off</div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Field
                            type="checkbox"
                            name="benefits"
                            value="Health insurance"
                            style={{ width: "auto", marginRight: 15 }}
                          />
                          <div>Health insurance</div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Field
                            type="checkbox"
                            name="benefits"
                            value="Life insurance"
                            style={{ width: "auto", marginRight: 15 }}
                          />
                          <div>Life insurance</div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Field
                            type="checkbox"
                            name="benefits"
                            value="Dental/ vision insurance"
                            style={{ width: "auto", marginRight: 15 }}
                          />
                          <div>Dental/ vision insurance</div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Field
                            type="checkbox"
                            name="benefits"
                            value="Retirement/ 401(k)"
                            style={{ width: "auto", marginRight: 15 }}
                          />
                          <div>Retirement/ 401(k)</div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Field
                            type="checkbox"
                            name="hasOtherBenefits"
                            style={{ width: "auto", marginRight: 15 }}
                          />
                          <div>others</div>
                        </div>
                        {values.hasOtherBenefits && (
                          <div className="form-group">
                            <Field name="otherBenefit" component="textarea" />
                            <p className="help-block text-danger"></p>
                          </div>
                        )}
                      </div>

                      <p className="help-block text-danger"></p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div style={{ width: "100%" }}>
              {currentPage === 0 ? (
                <div>
                  <Button
                    type="button"
                    text="Next"
                    size="lg"
                    onClick={() => setPage(1)}
                  >
                    Next
                  </Button>
                </div>
              ) : (
                <div style={{ display: "flex" }}>
                  <Button
                    type="button"
                    text="Back"
                    size="lg"
                    onClick={() => setPage(0)}
                    style={{ marginRight: 150 }}
                  >
                    Back
                  </Button>
                  <Button type="submit" text="Save" size="lg">
                    Save
                  </Button>
                </div>
              )}
            </div>
            <br />
            <br />
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default CompanySalaryForm;
