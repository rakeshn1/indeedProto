import React from "react";
import { Link } from "react-router-dom";
import CompanyDetailsCard from "./common/CompanyDetailsCard";
import CompanyHappinessCard from "./common/CompanyHappinessCard";
import ReviewCard from "./ReviewCard";
import { titleCase } from "title-case";
import { format } from "date-fns";
import { getCompanyReviews } from "../../../services/jobSeeker";

class CompanySnapShot extends React.Component {
  state = {
    reviews: undefined,
  };
  async componentDidMount() {
    let params = { isFeatured: true };
    const res = await getCompanyReviews(this.props.companyDetails?._id, params);
    this.setState({ reviews: res.data.reviews });
  }
  render() {
    console.log(this.props);
    return (
      <div className="p-3 mt-5">
        <div>
          <h4 className="mb-3">
            <b>Work happiness</b>
          </h4>
          <div className="mt-3 d-flex flex-row flex-wrap">
            <CompanyHappinessCard
              title="Appreciation Score"
              content={
                "Do people feel they are appreciated as a person at work?"
              }
              score={this.props.companyDetails?.appreciationScore}
            />

            <CompanyHappinessCard
              title="Happiness Score"
              content={"Do people feel happy at work most of the time?"}
              score={this.props.companyDetails?.happinessScore}
            />

            <CompanyHappinessCard
              title="Learning Score"
              content="Do people feel they often learn something at work?"
              score={this.props.companyDetails?.learningScore}
            />
            {/* <CompanyHappinessCard
              title="Work Score"
              content="more than $ 10B (USD) "
              score={this.props.companyDetails?.workScore}
            /> */}
          </div>
        </div>
        <div>
          <h4 className="mt-3 mb-3">
            <b>About the company</b>
          </h4>
          <div className="mt-3 d-flex flex-row flex-wrap">
            <CompanyDetailsCard
              title="CEO"
              content={this.props.companyDetails?.ceo}
            />

            <CompanyDetailsCard
              title=" Founded"
              content={this.props.companyDetails?.founded}
            />

            <CompanyDetailsCard
              title="CompanySize"
              content={
                <div>
                  <p style={{ marginBottom: 0, fontSize: "12px" }}>more than</p>
                  <span>{`${this.props.companyDetails?.companySize}`}</span>
                </div>
              }
            />
            <CompanyDetailsCard
              title="Revenue"
              content={
                <div>
                  <p style={{ marginBottom: 0, fontSize: "12px" }}>more than</p>
                  <span>{`$${this.props.companyDetails?.revenue}M (USD)`}</span>
                </div>
              }
              // content={`more than $${this.props.companyDetails?.revenue}B (USD)`}
            />
            <CompanyDetailsCard
              title="Industry"
              content={this.props.companyDetails?.industry}
            />
          </div>
          <p className="mt-3">{this.props.companyDetails?.description}</p>
          <Link to="/companydetails/about" className="link">
            <span style={{ color: "#2557A7" }}>
              <b>Learn more </b>
            </span>
          </Link>
        </div>
        <div className="mt-5">
          <h4 className="mb-3">
            <b> Our Mission</b>
          </h4>
          <p>{this.props.companyDetails?.mission}</p>
        </div>
        <div className="mt-5 ">
          <h4 className="mb-3">
            <b>Reviews</b>
          </h4>
          {this.state.reviews &&
            this.state.reviews?.map((review) => {
              return (
                <ReviewCard
                  reviewSummary={titleCase(review.reviewSummary)}
                  rating={review.rating}
                  review={titleCase(review.review)}
                  role={titleCase(review.jobTitle)}
                  city={titleCase(review.jobLocation)}
                  state={review?.state?.toUpperCase()}
                  reviewedOn={format(
                    new Date(Date.parse(review.date)),
                    "LLL do, yyyy"
                  )}
                  pros={review.pros}
                  cons={review.cons}
                  showHelpfulness={false}
                  reviewId={review._id}
                  status={review.status}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default CompanySnapShot;
