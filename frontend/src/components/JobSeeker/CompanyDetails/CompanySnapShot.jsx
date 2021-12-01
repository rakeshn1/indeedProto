import React from "react";
import { Link } from "react-router-dom";
import CompanyDetailsCard from "./common/CompanyDetailsCard";
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
    const res = await getCompanyReviews("619ebb543ee1aa8bb08188a3", params);
    this.setState({ reviews: res.data });
  }
  render() {
    console.log(this.props);
    return (
      <div className="p-3 mt-5">
        <div>
          <h4 className="mb-3">
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
              content="more than 10,000"
            />
            <CompanyDetailsCard
              title="Revenue"
              content="more than $ 10B (USD) "
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
                  rating={review.rating}
                  role={review.jobTitle}
                  city={review.jobLocation}
                  state="CA"
                  reviewedOn={format(
                    new Date(Date.parse(review.date)),
                    "LLL do, yyyy"
                  )}
                  pros={review.pros}
                  cons={review.cons}
                  markedAsHelpful={review.helpfulnessScore.yesCount}
                  markedAsNotHelpful={review.helpfulnessScore.noCount}
                  showHelpfulness={false}
                  reviewId={review._id}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default CompanySnapShot;
