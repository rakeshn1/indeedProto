import React from 'react';
import Joi from 'joi-browser';
import QuestionCard from './QuestionCard';
import '../../../styles/companyStyles.css';
import FiveStarComponent from './common/FiveStarComponent';
import Input from '../../common/Input';
import TextArea from '../../common/TextArea';
import Select from '../../common/Select';

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
      startDate: undefined,
      endDate: undefined,
      salary: undefined,
      ceoApproval: undefined,
    },
    errors: {},
  };

  schema = {
    companyName: Joi.string().required(),
    overallRating: Joi.number().required(),
    workLifeBal: Joi.number().allow(''),
    jobSecurity: Joi.number().allow(''),
    management: Joi.number().allow(''),
    culture: Joi.number().allow(''),
    reviewSummary: Joi.string().required(),
    review: Joi.string().max(150).required(),
    pros: Joi.string().allow(''),
    cons: Joi.string().allow(''),
    jobTitle: Joi.string().required(),
    jobLocation: Joi.string().required(),
    startDate: Joi.string().length(4).required(),
    endDate: Joi.string().length(4).required(),
    salary: Joi.number().allow(''),
    ceoApproval: Joi.boolean().allow(''),
    benefits: Joi.number().allow(''),
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
          />
          <TextArea label="Your Review" id="review" name="review" rows={10} />
          <Input label="Pros" id="pros" name="pros" onChange={this.handleChange} />
          <Input label="Cons" id="cons" name="cons" onChange={this.handleChange} />
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
            />
            <Input
              label="Job Location at Amazon.com"
              id="jobLocation"
              name="jobLocation"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="start">
          <Select
            label="Start Date"
            id="startDate"
            name="startDate"
            className="short"
            placeholder="Select Year"
            options={[1, 2, 2, 4]}
          />
          <Select
            label="End Date"
            id="endDate"
            name="endDate"
            className="short"
            placeholder="Select Year"
            options={[1, 2, 2, 4]}
          />
        </div>
      </React.Fragment>
    );
  };

  getSalaryInfo = () => {
    return (
      <div style={{ width: '70%' }}>
        <p className="question-label" style={{ textAlign: 'left', marginBottom: '2px' }}>
          <b>Salary at Amazon.com</b>
        </p>
        <div className="start">
          <Input
            id="salary"
            name="salary"
            style={{ marginRight: '10px', width: '300px' }}
            placeholder="Example: 30,000"
            onChange={this.handleChange}
          />

          <Select
            id="pay"
            name="pay"
            className="short"
            placeholder="per year"
            options={[1, 2, 2, 4]}
          />
        </div>
      </div>
    );
  };

  getOtherInfo = () => {
    return (
      <div className="start">
        <div>
          <p className="question-label" style={{ textAlign: 'left', marginBottom: '5px' }}>
            <b>Do you approve of {this.state.companyName}‘s CEO?</b>
          </p>

          <button
            className="custom-btn"
            style={{
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
              marginRight: '-1px',
            }}
          >
            <b>Yes</b>
          </button>
          <button
            className="custom-btn"
            style={{
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px',
              marginLeft: '-1px',
            }}
          >
            No
          </button>
        </div>
      </div>
    );
  };

  validateProperty = (input) => {
    const obj = {
      [input.name]: input.type === 'checkbox' ? input.checked : input.value,
    };
    const schema = { [input.name]: this.schema[input.name] };

    const { error } = Joi.validate(obj, schema);
    // console.log(error);
    return error ? error.details[0].message : null;
  };

  handleChange = (e) => {
    const errors = { ...this.state.errors };
    const error = this.validateProperty(e.currentTarget);
    if (error) {
      errors[e.currentTarget.name] = error;
    } else {
      delete errors[e.currentTarget.name];
    }

    const data = { ...this.state.data };
    data[e.currentTarget.name] =
      e.currentTarget.type === 'checkbox' ? e.currentTarget.checked : e.currentTarget.value;
    this.setState({ data, errors });
  };

  render() {
    return (
      <div className="reviews mt-5">
        <section className="section">
          <h4>Take a minute to review Amazon.com. </h4>
          <span>Your anonymous feedback will help fellow jobseekers</span>
          <ul style={{ fontSize: '13px' }}>
            <li>
              Company reviews are <b>NEVER</b> attached to your job applications
            </li>
            <li>
              The reviews <b>ONLY</b> include star ratings, review text, job title, location and
              review date
            </li>
          </ul>
        </section>
        <section className="section mt-2">
          <QuestionCard
            question="How would you rate this company?"
            content={
              <div>
                <div className="ratings">
                  <span>Overall rating</span>
                  <FiveStarComponent onReview={(val) => this.setState({ overallRating: val })} />
                </div>
                <div className="ratings">
                  <span>Job Work/Life Balance</span>
                  <FiveStarComponent onReview={(val) => this.setState({ workLifeBal: val })} />
                </div>
                <div className="ratings">
                  <span>Compensation/Benefits</span>
                  <FiveStarComponent onReview={(val) => this.setState({ benefits: val })} />
                </div>
                <div className="ratings">
                  <span>Job Security/Advancement</span>
                  <FiveStarComponent onReview={(val) => this.setState({ jobSecurity: val })} />
                </div>
                <div className="ratings">
                  <span>Management</span>
                  <FiveStarComponent onReview={(val) => this.setState({ management: val })} />
                </div>
                <div className="ratings">
                  <span>Job Culture</span>
                  <FiveStarComponent onReview={(val) => this.setState({ culture: val })} />
                </div>
              </div>
            }
          />
        </section>
        <section className="section">
          <QuestionCard
            question="The good and the bad. What stands out about working at this company?"
            content={this.getReviewSummary()}
          />
        </section>
        <section className="section">
          <QuestionCard question="Tell us about you" content={this.getJobInfo()} />
        </section>
        <section className="section">
          <QuestionCard question="What is the salary like?" content={this.getSalaryInfo()} />
        </section>
        <section className="section">
          <QuestionCard question="What do you think of the CEO?" content={this.getOtherInfo()} />
        </section>
        <section className="section">
          <div className="start">
            <button className="submit-btn" style={{ marginTop: '30px', marginBottom: '50px' }}>
              Finish
            </button>
          </div>
        </section>
      </div>
    );
  }
}
export default AddReview;
