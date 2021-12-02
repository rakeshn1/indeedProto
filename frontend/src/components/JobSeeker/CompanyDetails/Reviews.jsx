import React from "react";
import "../../../styles/companyStyles.css";
import Select from "../../common/Select";
import ReviewCard from "./ReviewCard";
import { Link } from "react-router-dom";
import { titleCase } from "title-case";
import { format } from "date-fns";
import {
  getCompanyReviews,
  getTotalReviews,
} from "../../../services/jobSeeker";

import { getCurrentUser } from "../../../services/auth";

const dateOptions = ["This_Week", "Last_Week", "Last_Month", "This_Month"];
class Reviews extends React.Component {
  state = {
    reviews: undefined,
    sortBy: undefined,
    filter: {
      rating: undefined,
      date: undefined,
    },
    pageNo: 1,
    totalPages: 0,
    isClean: true,
  };

  getFilteredResults = async (params) => {
    const { data } = await getCompanyReviews(
      this.props.companyDetails._id,
      params
    );
    const { reviews, totalDocs } = data;
    this.setState({ reviews });
    if (totalDocs) {
      const totalPages = Math.ceil(totalDocs / 5);
      this.setState({ totalPages });
    }
  };
  componentDidMount = async () => {
    const { data } = await getTotalReviews(this.props.companyDetails._id);

    const totalPages = Math.ceil(data / 5);
    this.setState({ totalPages });
    let params = {};
    const user = getCurrentUser();
    if (user) {
      params.jobSeekerId = user._id;
    }
    params.pageNo = 1;
    this.getFilteredResults(params);
  };
  handleFilter = async (e) => {
    const filter = { ...this.state.filter };
    filter[e.target.name] = e.target.value;
    this.setState({ filter, isClean: false, pageNo: 1 });
    let params = {};
    params.sortBy = this.state.sortBy;
    params.filter = { ...filter };
    params.pageNo = 1;
    this.getFilteredResults(params);
  };
  handleSortResults = async (e) => {
    let val = e.target.id;
    this.setState({ sortBy: val, isClean: false, pageNo: 1 });
    let params = {};
    params.sortBy = val;
    params.filter = this.state.filter;
    params.pageNo = 1;
    this.getFilteredResults(params);
  };
  goToNextPage = async () => {
    let params = {};
    params.pageNo = this.state.pageNo + 1;
    this.setState({ pageNo: this.state.pageNo + 1 });
    const user = getCurrentUser();
    if (this.state.isClean && user) {
      params.jobSeekerId = user._id;
      this.getFilteredResults(params);
    } else if (this.state.isClean && !user) {
      this.getFilteredResults(params);
    } else {
      params.sortBy = this.state.sortBy;
      params.filter = { ...this.state.filter };

      this.getFilteredResults(params);
    }
  };
  goToPrevPage = async () => {
    let params = {};
    params.pageNo = this.state.pageNo - 1;
    this.setState({ pageNo: this.state.pageNo - 1 });
    const user = getCurrentUser();
    if (this.state.isClean && user) {
      params.jobSeekerId = user._id;
      this.getFilteredResults(params);
    } else if (this.state.isClean && !user) {
      this.getFilteredResults(params);
    } else {
      params.sortBy = this.state.sortBy;
      params.filter = { ...this.state.filter };

      this.getFilteredResults(params);
    }
  };

  render() {
    return (
      <div className="p-3">
        <div className="d-flex flex-row justify-content-between pb-2">
          <h3>
            <b>
              {this.props.companyDetails.companyName} Pay & Benefits reviews
            </b>
          </h3>
          <button className="button-secondary">
            <Link
              className="link"
              params={{ companyDetails: this.props.companyDetails }}
              to={{
                pathname: `/company/${this.props.companyDetails._id}/addReview`,
                state: { companyDetails: this.props.companyDetails },
              }}
              // to={`/company/${this.props.companyDetails._id}/addReview`}
            >
              Review this company
            </Link>
          </button>
        </div>

        <div
          className="p-3 rounded-corners mt-1 d-flex flex-row justify-content-between flex-wrap"
          style={{ background: "#f3f2f1" }}
        >
          <div className="d-flex flex-row justify-content-start">
            <Select
              label="Filter by date range"
              name="searchReviews"
              class="medium rounded-corners me-2 input"
              name="date"
              id="date"
              labelclass="label"
              style={{ width: "200px" }}
              options={dateOptions}
              onChange={this.handleFilter}
              placeholder="Any"
            />
            <Select
              label="Filter by rating"
              id="rating"
              name="rating"
              options={[1, 2, 3, 4, 5]}
              placeholder="Any"
              className="rounded-corners"
              labelclass="label"
              style={{ width: "200px" }}
              onChange={this.handleFilter}
            />
          </div>
          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-column justify-content-between me-2">
              <p className="label">Sort by</p>
              <div
                className="d-flex flex-row justify-content-start "
                onClick={this.handleSortResults}
              >
                <button
                  className={`sortby-btn ${
                    this.state.sortBy == "helpfulnessScore.yesCount"
                      ? "active"
                      : ""
                  }`}
                  id="helpfulnessScore.yesCount"
                >
                  Helpfulness
                </button>
                <button
                  className={`sortby-btn ${
                    this.state.sortBy == "rating" ? "active" : ""
                  }`}
                  id="rating"
                >
                  Rating
                </button>
                <button
                  className={`sortby-btn ${
                    this.state.sortBy == "date" ? "active" : ""
                  }`}
                  id="date"
                  onClick={() => this.setState({ sortBy: "date" })}
                >
                  Date
                </button>
              </div>
            </div>
            {/* <Select
              label="Rating"
              id="rating"
              name="rating"
              options={[1, 2, 3, 4, 5]}
              placeholder="Any"
              className="rounded-corners"
              labelclass="label"
              style={{ width: "100px" }}
              onChange={this.handleFilter}
            /> */}
          </div>
        </div>
        {this.state.reviews &&
          this.state.reviews?.map((review) => {
            return (
              <ReviewCard
                reviewSummary={titleCase(review.reviewSummary)}
                review={titleCase(review?.review)}
                rating={review?.rating}
                role={titleCase(review?.jobTitle)}
                city={titleCase(review?.jobLocation)}
                state={review?.state?.toUpperCase()}
                reviewedOn={format(
                  new Date(Date.parse(review?.date)),
                  "LLL do, yyyy"
                )}
                pros={review?.pros}
                cons={review?.cons}
                markedAsHelpful={review.helpfulnessScore.yesCount}
                markedAsNotHelpful={review.helpfulnessScore.noCount}
                showHelpfulness={true}
                reviewId={review._id}
              />
            );
          })}
        <div className="d-flex flex-row justify-content-around">
          <div>
            <button
              className="invisibleButton"
              onClick={this.goToPrevPage}
              disabled={this.state.pageNo == 1}
            >
              <i
                className="fa fa-arrow-circle-left fa-lg"
                aria-hidden="true"
              ></i>
            </button>
            {this.state.pageNo}
            <button
              className="invisibleButton"
              onClick={this.goToNextPage}
              disabled={this.state.pageNo === this.state.totalPages}
            >
              <i
                className="fa fa-arrow-circle-right fa-lg"
                aria-hidden="true"
              ></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Reviews;
