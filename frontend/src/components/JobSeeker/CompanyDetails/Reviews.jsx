import React from "react";
import "../../../styles/companyStyles.css";
import Select from "../../common/Select";
import Input from "../../common/Input";
import ReviewCard from "./ReviewCard";
import { Link } from "react-router-dom";
import { getCompanyReviews } from "../../../services/jobSeeker";
class Reviews extends React.Component {
  componentDidMount = async () => {
    const res = await getCompanyReviews("6174aeb47623fc4a4f1a6bb1");
    console.log(res.data);
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
        <div className="p-3 rounded-corners" style={{ background: "#f3f2f1" }}>
          <div className="d-flex flex-row justify-content-between flex-wrap">
            <Select
              label="Job Title"
              id="jobTitle"
              name="jobTitle"
              placeholder="All"
              options={[1, 2, 2, 4]}
              className="me-5 medium rounded-corners"
              labelclass="label"
              required
            />
            <Select
              label="Location"
              id="location"
              name="location"
              options={[1, 2, 2, 4]}
              className="medium rounded-corners"
              labelclass="label"
              required
            />
          </div>
          <div>
            <span className="side-heading mt-5">
              <b>Ratings by category</b>
            </span>
            <div className="d-flex flex-row justify-content-start mt-3 flex-wrap">
              <div className="rounded-pill me-1">
                <span className="me-1">3.3</span>
                <span className="me-1">
                  <i class="fa fa-star"></i>
                </span>
                <span>Work-Life Balance</span>
              </div>
              <div className="rounded-pill me-1">
                <span className="me-1">3.3</span>
                <span className="me-1">
                  <i class="fa fa-star"></i>
                </span>
                <span>Pay & Benefits</span>
              </div>
              <div className="rounded-pill me-1">
                <span className="me-1">3.3</span>
                <span className="me-1">
                  <i class="fa fa-star"></i>
                </span>
                <span>Job Security & Advancement</span>
              </div>
              <div className="rounded-pill me-1">
                <span className="me-1">3.3</span>
                <span className="me-1">
                  <i class="fa fa-star"></i>
                </span>
                <span>Management</span>
              </div>
              <div className="rounded-pill me-1">
                <span className="me-1">3.3</span>
                <span className="me-1">
                  <i class="fa fa-star"></i>
                </span>
                <span>Culture</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="p-3 rounded-corners mt-1 d-flex flex-row justify-content-between flex-wrap"
          style={{ background: "#f3f2f1" }}
        >
          <div>
            <span className="label">Search reviews</span>
            <div className="d-flex flex-row justify-content-start">
              <Input
                name="searchReviews"
                class="medium rounded-corners me-2"
                id="searchReviews"
                labelclass="label"
                style={{ width: "300px" }}
              />
              <button className="button-secondary mt-3 ">Search</button>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-column justify-content-between me-2">
              <p className="label">Sort by</p>
              <div className="d-flex flex-row justify-content-start ">
                <button className="sortby-btn">Helpfulness</button>
                <button className="sortby-btn">Rating</button>
                <button className="sortby-btn">Date</button>
              </div>
            </div>
            <Select
              label="Language"
              id="language"
              name="language"
              options={[1, 2, 3]}
              placeholder="Any"
              className="rounded-corners"
              labelclass="label"
              style={{ width: "100px" }}
              required
            />
          </div>
        </div>
        <ReviewCard
          rating={"5.0"}
          role="Software Engineer"
          city="San Francisco"
          state="CA"
          reviewedOn={new Date()}
          pros={"Work environment"}
          cons={
            "Advancement is tough, moving beyond customer care is nearly impossible"
          }
          markedAsHelpful={23}
          markedAsNotHelpful={10}
          showHelpfulness={true}
        />
      </div>
    );
  }
}

export default Reviews;
