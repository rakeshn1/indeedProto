import React from "react";

class AboutCompany extends React.Component {
  render() {
    return (
      <div className="mt-3 p-3">
        <div className="mt-5">
          <h4 className="mb-3">
            <b>About Us</b>
          </h4>
          <p className="mt-2">{this.props.companyDetails?.about}</p>
        </div>
        <div className="mt-5">
          <h4 className="mb-3">
            <b>Our Culture</b>
          </h4>
          <p className="mt-2">{this.props.companyDetails?.workCulture}</p>
        </div>
        <div className="mt-5">
          <h4 className="mb-3">
            <b>Our Values</b>
          </h4>
          <p className="mt-2">{this.props.companyDetails?.values}</p>
        </div>
      </div>
    );
  }
}

export default AboutCompany;
