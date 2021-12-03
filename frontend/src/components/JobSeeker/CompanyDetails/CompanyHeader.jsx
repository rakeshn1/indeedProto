import React from "react";
import { NavLink, Link } from "react-router-dom";

import StarRating from "react-svg-star-rating";
import { getCompanyratings } from "../../../services/jobSeeker";

class CompanyHeader extends React.Component {
  state = {
    rating: undefined,
  };
  componentDidMount = async () => {
    if (this.props.companyDetails) {
      const res = await getCompanyratings(this.props.companyDetails?._id);
      this.setState({ rating: res.data });
    }
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.companyDetails != this.props.companyDetails) {
      const res = await getCompanyratings(this.props.companyDetails?._id);
      this.setState({ rating: res.data });
    }
  };
  render() {
    return (
      <div>
        <header className="company-header">
          <div style={{ borderBottom: "1px solid #b6b6b6" }}>
            <div className="company-image" />
            <div className="d-flex flex-column company-title-overview">
              <div
                className="mb-auto d-flex flex-row justify-content-between pt-3 pb-3"
                //   style={{ width: "70%", margin: "0 auto" }}
              >
                <div className="d-flex flex-row">
                  <img
                    src="https://picsum.photos/65/65"
                    alt="company-logo"
                    style={{ borderRadius: "8px" }}
                  />
                  <div className="ps-3" style={{ fontWeight: "700" }}>
                    <span style={{ fontSize: "20px" }}>
                      {this.props.companyDetails?.name}
                    </span>
                    <div className="pt-3">
                      <span className="pe-2">
                        {this.props.companyDetails?.happinessScore}
                      </span>
                      |<span className="pe-2 ps-2">{this.state.rating}</span>
                      <StarRating
                        size={18}
                        isReadOnly={true}
                        activeColor={"#9d2b6b"}
                        initialRating={this.state.rating}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <button className="primary-rounded-button link">
                    <Link
                      className="link"
                      style={{ color: "white" }}
                      params={{ companyDetails: this.props.companyDetails }}
                      to={{
                        pathname: `/company/${this.props.companyDetails?._id}/addReview`,
                        state: { companyDetails: this.props.companyDetails },
                      }}
                    >
                      Write a review
                    </Link>
                  </button>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <span className="company-page-tab">
                  <NavLink
                    to={`/companydetails/${this.props.companyDetails?._id}/snapshot`}
                    className="link"
                    style={{ color: "black" }}
                  >
                    Snapshot
                  </NavLink>
                </span>
                <span className="company-page-tab">
                  <NavLink
                    to={`/companydetails/${this.props.companyDetails?._id}/about`}
                    className="link"
                    style={{ color: "black" }}
                  >
                    Why Join Us
                  </NavLink>
                </span>
                <span className="company-page-tab">
                  <NavLink
                    to={`/companydetails/${this.props.companyDetails?._id}/review`}
                    className="link"
                    style={{ color: "black" }}
                  >
                    Reviews
                  </NavLink>
                </span>
                <span className="company-page-tab">
                  <NavLink
                    to={`/companydetails/${this.props.companyDetails?._id}/salaries`}
                    className="link"
                    style={{ color: "black" }}
                    >
                    Salaries
                  </NavLink>
                </span>
                <span className="company-page-tab">
                  <NavLink
                    to={`/companydetails/${this.props.companyDetails?._id}/photos`}
                    className="link"
                    style={{ color: "black" }}
                  >
                    Photos
                  </NavLink>
                </span>
                <span className="company-page-tab">
                  <NavLink
                    to={`/companydetails/${this.props.companyDetails?._id}/jobs`}
                    className="link"
                    style={{ color: "black" }}
                  >
                    Jobs
                  </NavLink>
                </span>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default CompanyHeader;
