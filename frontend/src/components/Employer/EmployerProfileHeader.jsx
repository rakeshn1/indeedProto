import React from "react";
import { Link } from "react-router-dom";

class EmployerProfileHeader extends React.Component {
  render() {
    return (
      <div>
        <header className="company-header">
          <div style={{ borderBottom: "1px solid #b6b6b6" }}>
            <div className="d-flex flex-row justify-content-between">
              <div
                className="mb-auto d-flex flex-row justify-content-between"
                style={{ width: "70%", margin: "0 auto" }}
              >
                <span>
                  <Link
                    to="/employer"
                    className="link"
                    style={{ color: "black" }}
                  >
                    Update Company
                  </Link>
                </span>
                <span>
                  <Link
                    to="/employer/employerDetails"
                    className="link"
                    style={{ color: "black" }}
                  >
                    Update Employer
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

export default EmployerProfileHeader;
