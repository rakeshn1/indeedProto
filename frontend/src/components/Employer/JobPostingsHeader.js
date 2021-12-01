import React from "react";
import { Link } from "react-router-dom";

class JobPostingsHeader extends React.Component {
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
                    to="/employer/addJobs"
                    className="link"
                    style={{ color: "black" }}
                  >
                    Add Job
                  </Link>
                </span>
                <span>
                  <Link
                    to="/employer/viewJobs"
                    className="link"
                    style={{ color: "black" }}
                  >
                    View jobs
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

export default JobPostingsHeader;
