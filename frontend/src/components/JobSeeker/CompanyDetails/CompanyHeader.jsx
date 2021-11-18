import React from "react";
import { Link } from "react-router-dom";

class CompanyHeader extends React.Component {
  render() {
    return (
      <div>
        <header className="company-header">
          <div style={{ borderBottom: "1px solid #b6b6b6" }}>
            <div className="company-image" />
            <div className="d-flex flex-column company-title-overview">
              <div
                className="mb-auto d-flex flex-row justify-content-between"
                //   style={{ width: "70%", margin: "0 auto" }}
              >
                <div>Amazon</div>
                <div>
                  <button className="primary-rounded-button">
                    Write a review
                  </button>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <span>
                  <Link
                    to="/companydetails"
                    className="link"
                    style={{ color: "black" }}
                  >
                    Snapshot
                  </Link>
                </span>
                <span>
                  <Link
                    to="/companydetails/about"
                    className="link"
                    style={{ color: "black" }}
                  >
                    Why Join Us
                  </Link>
                </span>
                <span>
                  <Link
                    to="/companydetails/review"
                    className="link"
                    style={{ color: "black" }}
                  >
                    Reviews
                  </Link>
                </span>
                <span>
                  <Link to="/" className="link" style={{ color: "black" }}>
                    Salaries
                  </Link>
                </span>
                <span>
                  <Link to="/" className="link" style={{ color: "black" }}>
                    Photos
                  </Link>
                </span>
                <span>
                  <Link to="/" className="link" style={{ color: "black" }}>
                    Jobs
                  </Link>
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
