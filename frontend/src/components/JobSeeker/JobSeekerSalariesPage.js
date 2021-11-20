import React, { Component } from "react";

class JobSeekerSalariesPage extends React.Component {
  render() {
    return (
      <div
        style={{
          fontFamily:
            "Noto Sans,Helvetica Neue,Helvetica,Arial,Liberation Sans,Roboto,Noto,sans-serif",
        }}
      >
        <div
          style={{
            height: "326px",
            backgroundColor: "#e8f3fc",
            backgroundImage: `url(
              "https://d3hbwax96mbv6t.cloudfront.net/title-webapp/_next/static/images/salaries-8d20dc14bdeae8889387e0fb40e0d546.png"
            )`,
            padding: "50px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
            backgroundSize: "contain",
          }}
        >
          <div className="container">
            <h1 style={{ fontSize: "1.75rem", fontWeight: "700" }}>
              Find a career you'll love
            </h1>
            <span style={{ fontSize: "0.85rem" }}>
              Explore which careers have the highest job satisfaction, best
              salaries, and more
            </span>
          </div>
          <div style={{ marginLeft: "20px" }}>
            <div
              style={{
                marginTop: "20px",
                borderTopLeftRadius: "0.5rem",
                borderTopRightRadius: "0.5rem",
                width: "794px",
                height: "10px",
                backgroundColor: "#7eacfb",
              }}
            ></div>
            <div
              style={{
                backgroundColor: "white",
                width: "794px",
                height: "135px",
                borderBottomLeftRadius: "0.5rem",
                borderBottomRightRadius: "0.5rem",
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default JobSeekerSalariesPage;
