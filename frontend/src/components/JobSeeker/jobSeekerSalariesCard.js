import React, { Component } from "react";
import BenefitsCard from "../JobSeeker/SalariesPageBenefitsCard";

class JobSeekerSalariesCard extends React.Component {
  state = {
    data: {
      jobTitle: "Software Engineer",
      location: "United States",
      salariesReviewCount: "27.2K",
      updatedOn: "November 17, 2021",
      averageSalary: "115,134",
      cashBonus: "4,000",
    },
    benefitsList: [
      {
        icon: "https://d3hbwax96mbv6t.cloudfront.net/title-webapp/_next/static/images/category-financial-perks-6c2a310ae271764e6bf72683e6f43e55.svg",
        benefitName: "Stock Options",
      },
      {
        icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjRkY5NDZEIiBkPSJNMTIuODkzIDEyLjE5NnYyLjQyM0gyOS4wMXYtOS40Nkg2LjM3M3Y3LjAzN3oiLz48cGF0aCBmaWxsPSIjMDAwIiBkPSJNNS45MjcgNC41djYuMzc5SDEuMTI1djIyLjQwM2gzMy41ODZ2LTIwLjEySDI5LjkxVjQuNUg1LjkyN3pNOC4zIDYuODc0aDE5LjIzNHY2LjI4OEgxNC4yOTFWMTAuODhoLTUuOTlWNi44NzR6bS00LjggNi4zOGg4LjQxN3YyLjI4NGgyMC40MTl2MTUuMzY3SDMuNXYtMTcuNjV6Ii8+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTIyLjQxNiAyNC45MzFoNS42MjJ2LTEuNTg0aC01LjYyMnptLTE0LjYxOCAwaDExLjQzNXYtMS41ODRINy43OTh6Ii8+PC9nPjwvc3ZnPg==",
        benefitName: "Visa Sponsorship",
      },
      {
        icon: "https://d3hbwax96mbv6t.cloudfront.net/title-webapp/_next/static/images/category-financial-perks-6c2a310ae271764e6bf72683e6f43e55.svg",
        benefitName: "Referral program",
      },
      {
        icon: "https://d3hbwax96mbv6t.cloudfront.net/title-webapp/_next/static/images/category-financial-perks-6c2a310ae271764e6bf72683e6f43e55.svg",
        benefitName: "Commuter assistance",
      },
      {
        icon: "https://d3hbwax96mbv6t.cloudfront.net/title-webapp/_next/static/images/category-meal-a4feff3cdb9be4307571e89408fd8e26.svg",
        benefitName: "Food provided",
      },
    ],
  };

  render() {
    return (
      <div>
        <div
          style={{
            marginTop: "20px",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
            width: "100%",
            height: "10px",
            backgroundColor: "#065FF7",
          }}
        ></div>
        <div
          style={{
            borderColor: "#ececec",
            border: "2px solid #ececec",
            backgroundColor: "white",
            width: "100%",
            height: "fit-content",
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
            paddingTop: "30px",
            paddingLeft: "40px",
            paddingBottom: "30px",
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              className="col-4"
              style={{ borderRight: "1px solid #ececec", paddingRight: "50px" }}
            >
              <h2
                style={{
                  fontSize: "1.4375rem",
                  letterSpacing: "-.1px",
                  lineHeight: "1.22",
                  fontWeight: "bold",
                  color: "#6f6f6f",
                }}
              >
                Average base salary
              </h2>
              <div>
                {this.state.data.salariesReviewCount} salaries reported, updated
                at {this.state.data.updatedOn}
              </div>
              <div
                style={{
                  color: "#595959",
                  fontSize: "49px",
                  padding: "8px 8px 2px",
                  fontWeight: "bold",
                }}
              >
                ${this.state.data.averageSalary}
              </div>
              <div
                style={{
                  fontSize: "1.4375rem",
                  letterSpacing: "-.1px",
                  fontWeight: "400",
                  lineHeight: "1.12",
                }}
              >
                per year
              </div>
              <h3
                style={{
                  marginTop: "20px",
                  fontSize: "1rem",
                  letterSpacing: "0px",
                  fontWeight: "400",
                  lineHeight: "1.38",
                }}
              >
                The average salary for a {this.props.jobTitle} is $
                {this.state.data.averageSalary} per year in the{" "}
                {this.props.location} and {this.state.data.cashBonus} cash bonus
                per year.
              </h3>
            </div>
            <div className="col-8" style={{ paddingLeft: "30px" }}>
              <h2
                style={{
                  fontSize: "1.125rem",
                  letterSpacing: "-.06px",
                  lineHeight: "1.34",
                  fontWeight: "700",
                  color: "#767676",
                }}
              >
                Additional compensation
              </h2>
              <div
                style={{
                  backgroundColor: "#F9F9F9",
                  width: "fit-content",
                  minWidth: "260px",
                  display: "flex",
                  borderRadius: "8px",
                  padding: "1rem",
                }}
              >
                <div
                  style={{
                    color: "#6f6f6f",
                    fontSize: "1.125rem",
                    letterSpacing: "-.06px",
                    fontWeight: "400",
                    lineHeight: "1.34",
                    margin: "auto",
                  }}
                >
                  Cash Bonus
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "1.875rem",
                      letterSpacing: "-.12px",
                      lineHeight: "1.14",
                      fontWeight: "700",
                      color: "#595959",
                      marginLeft: "30px",
                    }}
                  >
                    ${this.state.data.cashBonus}
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                      fontWeight: "700",
                      fontSize: ".875rem",
                      letterSpacing: "0",
                      lineHeight: "1.43",
                    }}
                  >
                    per year
                  </div>
                </div>
              </div>
              <div
                style={{
                  lineHeight: "1.34",
                  fontWeight: "700",
                  fontSize: "1.125rem",
                  color: "#6f6f6f",
                  marginTop: "30px",
                  marginBottom: "10px",
                }}
              >
                Most common benefits
              </div>
              <div className="container">
                <div className="row">
                  {this.state.benefitsList.map((benefit) => (
                    <BenefitsCard {...benefit}></BenefitsCard>
                  ))}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JobSeekerSalariesCard;
