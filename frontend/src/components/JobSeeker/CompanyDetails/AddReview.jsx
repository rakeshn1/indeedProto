import React from "react";
import QuestionCard from "./QuestionCard";
import "../../../styles/companyStyles.css";
import StarRating from "react-svg-star-rating";

import Input from "../../common/Input";
import TextArea from "../../common/TextArea";
import { addReview } from "../../../services/jobSeeker";
import Joi from "joi-browser";

class AddReview extends React.Component {
  state = {
    data: {
      companyName: undefined,
      overallRating: undefined,
      workLifeBal: undefined,
      jobSecurity: undefined,
      management: undefined,
      culture: undefined,
      benefits: undefined,
      reviewSummary: undefined,
      review: undefined,
      pros: undefined,
      cons: undefined,
      jobTitle: undefined,
      jobLocation: undefined,
      ceoApproval: undefined,
      tips: undefined,
    },
    errors: {},
  };
  baseState = { ...this.state };
  schema = {
    companyName: Joi.string().required(),
    overallRating: Joi.number().required(),
    workLifeBal: Joi.number().allow(""),
    jobSecurity: Joi.number().allow(""),
    management: Joi.number().allow(""),
    culture: Joi.number().allow(""),
    reviewSummary: Joi.string().required(),
    review: Joi.string().max(150).required(),
    pros: Joi.string().allow(""),
    cons: Joi.string().allow(""),
    jobTitle: Joi.string().required(),
    jobLocation: Joi.string().required(),
    ceoApproval: Joi.boolean().allow(""),
    benefits: Joi.number().allow(""),
    tips: Joi.string().allow(""),
  };

  validateProperty = (input) => {
    const obj = {
      [input.name]: input.type === "checkbox" ? input.checked : input.value,
    };
    const schema = { [input.name]: this.schema[input.name] };

    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };
  handleChange = (e) => {
    const errors = { ...this.state.errors };
    const error = this.validateProperty(e.currentTarget);
    error
      ? (errors[e.currentTarget.name] = error)
      : delete errors[e.currentTarget.name];

    const data = { ...this.state.data };
    data[e.currentTarget.name] =
      e.currentTarget.type === "checkbox"
        ? e.currentTarget.checked
        : e.currentTarget.value;
    this.setState({ data, errors });
  };

  setProperty = (category, value) => {
    const data = { ...this.state.data };

    data[category] = value;
    this.setState({ data });
  };

  handleCeoApproval = (e) => {
    console.log(e);
    const data = { ...this.state.data };

    data.ceoApproval = e;
    this.setState({ data });
  };

  getReviewSummary = () => {
    return (
      <div className="start">
        <div>
          <Input
            label="Review Summary"
            id="reviewSummary"
            name="reviewSummary"
            placeholder="Example: Productive and fun workplace with ping pong table"
            onChange={this.handleChange}
            className="mb-3 bold-input"
            required
          />
          <TextArea
            label="Your Review"
            id="review"
            name="review"
            rows={10}
            className="mb-3"
            onChange={this.handleChange}
            required
          />
          <Input
            label="Pros"
            id="pros"
            name="pros"
            onChange={this.handleChange}
            className="mb-3 bold-input"
            required
          />
          <Input
            label="Cons"
            id="cons"
            name="cons"
            onChange={this.handleChange}
            required
            className="bold-input"
          />
        </div>
      </div>
    );
  };

  getJobInfo = () => {
    return (
      <React.Fragment>
        <div className="start">
          <div>
            <Input
              id="jobTitle"
              name="jobTitle"
              label="Job Title at Amazon.com"
              onChange={this.handleChange}
              className="mb-3 bold-input"
              required
            />
            <Input
              label="Job Location at Amazon.com"
              id="jobLocation"
              name="jobLocation"
              onChange={this.handleChange}
              className="mb-3 bold-input"
              required
            />
          </div>
        </div>
      </React.Fragment>
    );
  };

  getOtherInfo = () => {
    return (
      <div className="start">
        <div>
          <p
            className="question-label"
            style={{ textAlign: "left", marginBottom: "5px" }}
          >
            <b>Do you approve of {this.state.companyName}'s CEO?</b>
          </p>

          <button
            type="button"
            className={
              this.state.data.ceoApproval == true
                ? "custom-btn active"
                : "custom-btn"
            }
            style={{
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
              marginRight: "-1px",
            }}
            onClick={() => this.handleCeoApproval(true)}
          >
            <b>Yes</b>
          </button>
          <button
            type="button"
            className={
              this.state.data.ceoApproval == false
                ? "custom-btn active"
                : "custom-btn"
            }
            style={{
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
              marginLeft: "-1px",
            }}
            onClick={() => this.handleCeoApproval(false)}
          >
            No
          </button>
        </div>
      </div>
    );
  };

  getTips = () => {
    return (
      <div className="start">
        <TextArea
          label="What is the hiring process at Apple?"
          id="tips"
          name="tips"
          rows={10}
          className="mb-3"
          onChange={this.handleChange}
        />
      </div>
    );
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addReview(this.state.data);
      if (response && response.status === 200) {
        console.log("added reviews successfully");
        // this.props.history.push("/companydetails");
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  render() {
    return (
      <div className="reviews mt-5">
        <form onSubmit={this.handleSubmit}>
          <section className="section mt-5">
            <h4>Take a minute to review Amazon.com. </h4>
            <span>Your anonymous feedback will help fellow jobseekers</span>
            <ul style={{ fontSize: "13px" }}>
              <li>
                Company reviews are <b>NEVER</b> attached to your job
                applications
              </li>
              <li>
                The reviews <b>ONLY</b> include star ratings, review text, job
                title, location and review date
              </li>
            </ul>
          </section>
          <section className="section mt-3">
            <QuestionCard
              question="How would you rate this company?"
              content={
                <div>
                  <div className="ratings">
                    <div>
                      <span>Overall rating</span>
                      <span className="required">*</span>
                    </div>
                    <StarRating
                      activeColor="#ffd055"
                      handleOnClick={(val) =>
                        this.setProperty("overallRating", val)
                      }
                      starClassName="star"
                    />
                  </div>
                  <div className="ratings">
                    <span>Job Work/Life Balance</span>
                    <StarRating
                      activeColor="#ffd055"
                      handleOnClick={(val) =>
                        this.setProperty("workLifeBal", val)
                      }
                      starClassName="star"
                    />
                  </div>
                  <div className="ratings">
                    <span>Compensation/Benefits</span>
                    <StarRating
                      activeColor="#ffd055"
                      handleOnClick={(val) => this.setProperty("benefits", val)}
                      starClassName="star"
                    />
                  </div>
                  <div className="ratings">
                    <span>Job Security/Advancement</span>
                    <StarRating
                      activeColor="#ffd055"
                      handleOnClick={(val) =>
                        this.setProperty("jobSecurity", val)
                      }
                      starClassName="star"
                    />
                  </div>
                  <div className="ratings">
                    <span>Management</span>
                    <StarRating
                      activeColor="#ffd055"
                      handleOnClick={(val) =>
                        this.setProperty("management", val)
                      }
                      starClassName="star"
                    />
                  </div>
                  <div className="ratings">
                    <span>Job Culture</span>
                    <StarRating
                      activeColor="#ffd055"
                      handleOnClick={(val) => this.setProperty("culture", val)}
                      starClassName="star"
                    />
                  </div>
                </div>
              }
            />
          </section>
          <section className="section mt-3">
            <QuestionCard
              question="The good and the bad. What stands out about working at this company?"
              content={this.getReviewSummary()}
            />
          </section>
          <section className="section mt-3">
            <QuestionCard
              question="Tell us about you"
              content={this.getJobInfo()}
            />
          </section>
          <section className="section mt-3">
            <QuestionCard
              question="What do you think of the CEO?"
              content={this.getOtherInfo()}
            />
          </section>

          <section className="section mt-3">
            <QuestionCard
              question="Please help answer these questions about Apple?"
              content={this.getTips()}
            />
          </section>

          <section className="section mt-3">
            <div className="start">
              <button
                className="submit-btn"
                style={{ marginTop: "30px", marginBottom: "50px" }}
              >
                Finish
              </button>
            </div>
          </section>
        </form>
      </div>
    );
  }
}
export default AddReview;
