import React from "react";

class JobCard extends React.Component {
  render() {
    return (
      <div className="jobCard mb-1">
        <h6 className="black">
          <b> Amazon Grocery Fresh Associate</b>
        </h6>
        <span style={{ fontSize: "14px", color: "#4b4b4b" }}>Seattle, WA</span>
        <p style={{ fontSize: "12px", color: "#4b4b4b" }}>6 days ago</p>
      </div>
    );
  }
}

export default JobCard;
