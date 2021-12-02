import React from "react";

class CompanyHappinessCard extends React.Component {
  render() {
    return (
      <div className="company-happiness-card d-flex flex-column justify-content-between">
        <div className="d-flex flex-row">
          <span
            style={{
              fontSize: "18px",
              fontWeight: "800",
              background: "#f2f2f2",
              borderRadius: "5px",
              padding: "5px 10px",
            }}
            className="m-1"
          >
            {this.props.score}
          </span>
          <div className="d-flex flex-column ps-2">
            <span style={{ fontSize: "16px" }}>
              <b>{this.props.title}</b>
            </span>
            <span style={{ fontSize: "12px" }}>
              {this.props.score > 80 ? "Good" : "Average"}
            </span>
          </div>
        </div>

        <span
          style={{
            fontSize: "15px",
            border: "1px solid #d4d2d0",
            borderRadius: "5px",
          }}
          className="p-2 mt-2"
        >
          {this.props.content}
        </span>
      </div>
    );
  }
}

export default CompanyHappinessCard;
