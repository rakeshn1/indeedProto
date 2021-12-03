import React, { Component } from "react";
import { Link } from "react-router-dom";

class JobSeekerCompanyRow extends React.Component {
  render() {
    let { logo, name, rating, mission, _id } = this.props;
    if (!logo) {
      logo = "https://www.oiltechconnect.com/front-end/img/default-logo.png";
    }
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            padding: "10px",
          }}
        >
          <div>
            <img
              className="card-img-top"
              src={logo}
              style={{
                height: "48px",
                width: "48px",
                boxShadow:
                  "0 0.125rem 0.25rem rgb(45 45 45 / 12%), 0 0.0625rem 0.1875rem rgb(45 45 45 / 16%), 0 0 0.125rem rgb(45 45 45 / 20%)",
                borderRadius: "0.5rem",
              }}
            ></img>
          </div>
          <div
            style={{ paddingLeft: "15px", paddingTop: "2px", width: "500px" }}
          >
            <Link
              style={{
                fontSize: "1rem",
                color: "#2557a7",
                fontWeight: "700",
                width: "300px",
                textDecoration: "none",
              }}
              to={`/companyDetails/${_id}`}
            >
              {name}
            </Link>
            <Link
              to={`/companyDetails/${_id}/review`}
              style={{ display: "flex", color: "#2d2d2d" }}
            >
              <div
                style={{
                  color: "#2d2d2d",
                  textDecorationColor: "#2d2d2d",
                  display: "flex",
                }}
              >
                <span
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    fontWeight: "700",
                  }}
                >
                  {parseInt(rating)}
                </span>
              </div>
              <div
                style={{
                  color: "#9d2b6b",
                  paddingLeft: "10px",
                  marginTop: "-2px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-star-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
              </div>
            </Link>
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              lineHeight: "1.5",
              color: "#767676",
              // paddingLeft: "100px",
              marginTop: "5px",
              width: "100%",
              maxHeight: "100px",
              overflow: "auto",
            }}
          >
            {mission}
          </div>
          <div style={{ color: "#2557a7", paddingTop: "7px" }}>
            <Link
              style={{ paddingLeft: "50px", color: "#2557a7" }}
              to={`/companyDetails/${_id}/review`}
            >
              Reviews
            </Link>
            <Link
              style={{ paddingLeft: "50px", color: "#2557a7" }}
              to={`/companyDetails/${_id}/review`}
            >
              Salaries
            </Link>
            <Link
              style={{ paddingLeft: "50px", color: "#2557a7" }}
              to={`/companyDetails/${_id}/jobs`}
            >
              Jobs
            </Link>
          </div>
        </div>
        <hr
          style={{
            marginTop: "10px",
            color: "black",
            backgroundColor: "black",
            height: "1px",
            width: "100%",
          }}
        ></hr>
      </React.Fragment>
    );
  }
}

export default JobSeekerCompanyRow;
