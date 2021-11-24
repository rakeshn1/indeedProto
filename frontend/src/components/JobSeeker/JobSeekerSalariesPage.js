import React, { Component } from "react";
import SearchBox from "../common/SearchBox";
import { Link } from "react-router-dom";
import Button from "../common/Button";

class JobSeekerSalariesPage extends React.Component {
  state = {
    jobTitle: " ",
    location: " ",
  };

  onSearchClick = () => {};

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
            marginTop: "-30px",
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
                paddingTop: "25px",
                paddingLeft: "30px",
              }}
            >
              <div style={{ display: "flex", marginBottom: "1.5rem" }}>
                <div style={{ width: "300px" }}>
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
                    What
                  </label>
                  <SearchBox
                    onChange={(jobTitle) => {
                      this.setState({ jobTitle });
                    }}
                    placeholder="Job title"
                    // innerLabel="What"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-search"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    }
                    style={{
                      marginLeft: "0px",
                      height: "40px",
                      width: "90%",
                    }}
                    value={this.state.jobTitle}
                  />
                </div>
                <div style={{ width: "300px" }}>
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
                    Where
                  </label>
                  <SearchBox
                    onChange={(location) => {
                      this.setState({ location });
                    }}
                    placeholder="location"
                    // innerLabel="What"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-geo-alt-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                      </svg>
                    }
                    style={{
                      marginLeft: "0px",
                      height: "40px",
                      width: "90%",
                    }}
                    value={this.state.location}
                  />
                </div>
                {/* <Button
                  text="Search"
                  onClick={this.onSearchClick}
                  style={{
                    marginTop: "24px",
                    width: "130px",
                    height: "43px",
                    backgroundColor: "#065FF7",
                  }}
                /> */}
                <Link
                  className="btn"
                  to={`/jobSeeker/salaries/search/${this.state.jobTitle}/${this.state.location}`}
                  style={{
                    width: "130px",
                    hight: "43px",
                    backgroundColor: "#065FF7",
                    color: "white",
                    textDecorationColor: "none",
                    marginTop: "27px",
                    marginBottom: "2px",
                    borderRadius: "10px",
                  }}
                >
                  Search
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JobSeekerSalariesPage;
