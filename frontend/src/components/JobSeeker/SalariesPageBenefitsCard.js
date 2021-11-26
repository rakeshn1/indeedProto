import React, { Component } from "react";

class BenefitsCard extends React.Component {
  render() {
    const { icon, benefitName } = this.props;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5px 5px 0px 0px",
          margin: "10px 15px 0px 0px",
          width: "fit-content",
        }}
      >
        <img
          src={icon}
          style={{ height: "15px", width: "15px", margin: "auto" }}
          alt=""
        ></img>
        <div
          style={{
            marginLeft: "9px",
            fontSize: "0.875rem",
            fontWeight: "400",
            lineHeight: "1.43",
            letterSpacing: "0",
          }}
        >
          {benefitName}
        </div>
      </div>
    );
  }
}

export default BenefitsCard;
