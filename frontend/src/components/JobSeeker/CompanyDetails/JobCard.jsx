import React from "react";
import { format } from "date-fns";

class JobCard extends React.Component {
  render() {
    return (
      <div
        className={`mb-1 jobCard ${this.props.isActive ? "activeJob" : ""}`}
        onClick={() => this.props.setCurrentJob(this.props.jobDetails._id)}
      >
        <h6 className="black">
          <b> {this.props.jobDetails.jobTitle}</b>
        </h6>
        <span style={{ fontSize: "14px", color: "#4b4b4b" }}>
          {this.props.jobDetails.location.city},{" "}
          {this.props.jobDetails.location.state}
        </span>
        <p className="mt-1" style={{ fontSize: "12px", color: "#4b4b4b" }}>
          {format(
            new Date(Date.parse(this.props.jobDetails.datePosted)),
            "LLL do, yyyy"
          )}
        </p>
      </div>
    );
  }
}

export default JobCard;
