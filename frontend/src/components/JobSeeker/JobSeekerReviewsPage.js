import React, { Component } from "react";
import { Link } from "react-router-dom";

class JobSeekerReviewsPage extends React.Component {
  state = {
    companyName: "Amazon",
    location: "USA",
  };
  render() {
    return (
      <div
        className="container"
        style={{
          fontFamily:
            "Noto Sans,Helvetica Neue,Helvetica,Arial,Liberation Sans,Roboto,Noto,sans-serif",
          paddingLeft: "150px",
          paddingRight: "100px",
          paddingTop: "70px",
        }}
      >
        <h1
          style={{
            fontWeight: "700",
            fontSize: "2.75rem",
            lineHeight: "1.25",
            letterSpacing: "-.0625rem",
            marginBottom: "1rem",
          }}
        >
          Find great places to work
        </h1>
        <h2
          style={{
            fontWeight: "400",
            fontSize: "1.25rem",
            lineHeight: "1.5",
            color: "#595959",
            marginBottom: "1.5rem",
          }}
        >
          Get access to millions of company reviews
        </h2>

        <div style={{ display: "flex", marginBottom: "1.5rem" }}>
          <div style={{ width: "350px" }}>
            <label
              style={{
                fontWeight: "700",
                fontSize: "1rem",
                lineHeight: "1.5",
                opacity: "1",
                marginBottom: "0.25rem",
                color: "#2d2d2d",
              }}
            >
              Company name or job title
            </label>
          </div>
          <div style={{ width: "350px" }}>
            <label
              style={{
                fontWeight: "700",
                fontSize: "1rem",
                lineHeight: "1.5",
                opacity: "1",
                marginBottom: "0.25rem",
                color: "#2d2d2d",
              }}
            >
              City, state, or zip (optional)
            </label>
          </div>

          <Link
            className="btn btn-primary"
            to={`/jobSeeker/reviews/search/${this.state.companyName}/${this.state.location}`}
          >
            Find Companies
          </Link>
        </div>

        <Link
          to="/jobSeeker/salaries"
          style={{
            borderRadius: "0.25rem",
            color: "#2557a7",
            lineHeight: "1.15",
          }}
        >
          Do you want to search for salaries?
        </Link>
      </div>
    );
  }
}

export default JobSeekerReviewsPage;
