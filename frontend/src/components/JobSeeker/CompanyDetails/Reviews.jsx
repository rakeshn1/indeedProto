import React from "react";
import "../../../styles/companyStyles.css";
import Select from "../../common/Select";
import ReviewCard from "./ReviewCard";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { getCompanyReviews } from "../../../services/jobSeeker";

const dateOptions = ["This_Week", "Last_Week", "This_Month", "Last_Month"];
class Reviews extends React.Component {
  state = {
    reviews: undefined,
    sortBy: undefined,
    filter: {
      rating: undefined,
      date: undefined,
    },
    pageNo: 1,
  };

  getFilteredResults = async (params) => {
    params.pageNo = this.state.pageNo;
    const res = await getCompanyReviews("619ebb543ee1aa8bb08188a3", params);
    this.setState({ reviews: res.data });
  };
  componentDidMount = async () => {
    this.getFilteredResults({});
  };
  handleFilter = async (e) => {
    const filter = { ...this.state.filter };
    filter[e.target.name] = e.target.value;
    this.setState({ filter });
    let params = {};
    params.sortBy = this.state.sortBy;
    params.filter = { ...filter };
    this.getFilteredResults(params);
  };
  handleSortResults = async (e) => {
    let val = e.target.id;
    this.setState({ sortBy: val });
    let params = {};
    params.sortBy = val;
    params.filter = this.state.filter;
    this.getFilteredResults(params);
  };

  render() {
    return (
      <div className="p-3">
        <div className="d-flex flex-row justify-content-between pb-2">
          <h3>
            <b>{this.props.companyName} Pay & Benefits reviews</b>
          </h3>
          <button className="button-secondary">
            <Link className="link" to="/company/addReview">
              Review this company
            </Link>
          </button>
        </div>

        <div
          className="p-3 rounded-corners mt-1 d-flex flex-row justify-content-between flex-wrap"
          style={{ background: "#f3f2f1" }}
        >
          <div>
            <span className="label">Search reviews</span>
            <div className="d-flex flex-row justify-content-start">
              <Select
                name="searchReviews"
                class="medium rounded-corners me-2 input"
                name="date"
                id="date"
                labelclass="label"
                style={{ width: "300px" }}
                options={dateOptions}
                onChange={this.handleFilter}
              />
              <button className="button-secondary mt-3 ">Search</button>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-column justify-content-between me-2">
              <p className="label">Sort by</p>
              <div
                className="d-flex flex-row justify-content-start "
                onClick={this.handleSortResults}
              >
                <button className="sortby-btn" id="helpfulnessScore.yesCount">
                  Helpfulness
                </button>
                <button className="sortby-btn" id="rating">
                  Rating
                </button>
                <button
                  className="sortby-btn"
                  id="date"
                  onClick={() => this.setState({ sortBy: "date" })}
                >
                  Date
                </button>
              </div>
            </div>
            <Select
              label="Rating"
              id="rating"
              name="rating"
              options={[1, 2, 3, 4, 5]}
              // placeholder="Any"
              className="rounded-corners"
              labelclass="label"
              style={{ width: "100px" }}
              onChange={this.handleFilter}
            />
          </div>
        </div>
        {this.state.reviews &&
          this.state.reviews?.map((review) => {
            return (
              <ReviewCard
                reviewSummary={review.reviewSummary}
                review={review.review}
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
                showHelpfulness={true}
                reviewId={review._id}
              />
            );
          })}
      </div>
    );
  }
}

export default Reviews;
