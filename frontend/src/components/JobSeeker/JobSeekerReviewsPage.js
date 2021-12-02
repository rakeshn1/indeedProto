import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import SearchBox from "../common/SearchBox";
import {
  getCompanyNamesAndJobTitles,
  getLocations,
} from "../../services/searchService";
import Button from "../common/Button";

class JobSeekerReviewsPage extends React.Component {
  state = {
    companyNameAndJobTitle: "",
    location: "",
    companyNameAndJobTitleSearchResults: [],
    locationSearchResults: [],
  };

  updateCompanyNameAndJobTitle = async (companyNameAndJobTitle) => {
    await this.setState({
      companyNameAndJobTitle,
    });
    if (companyNameAndJobTitle) {
      console.log("if companyname: ", typeof companyNameAndJobTitle);
      const { data: companyNameAndJobTitleSearchResults } =
        await getCompanyNamesAndJobTitles(companyNameAndJobTitle);
      console.log(
        "companyNameAndJobTitleSearchResults: ",
        companyNameAndJobTitleSearchResults
      );
      await this.setState({ companyNameAndJobTitleSearchResults });
    }
  };

  updateLocation = async (location) => {
    this.setState({ location });
    if (location) {
      const { data: locationSearchResults } = await getLocations(location);
      this.setState({ locationSearchResults });
    }
  };

  render() {
    // let url = `/jobSeeker/reviews/search/`;
    // if (this.state.companyNameAndJobTitle) {
    //   url += `?companyNameAndJobTitle=${this.state.companyNameAndJobTitle}`;
    // }
    // if (this.state.location) {
    //   url += `&location=${this.state.location}`;
    // }

    const companyNameAndJobTitle = this.state.companyNameAndJobTitle
      ? this.state.companyNameAndJobTitle
      : " ";
    const location = this.state.location ? this.state.location : " ";

    const url = `/jobSeeker/reviews/search/${companyNameAndJobTitle}/${location}`;

    return (
      <div
        className="container"
        style={{
          fontFamily:
            "Noto Sans,Helvetica Neue,Helvetica,Arial,Liberation Sans,Roboto,Noto,sans-serif",
          paddingTop: "70px",
          width: "70%",
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
            <SearchBox
              onChange={(companyNameAndJobTitle) => {
                this.updateCompanyNameAndJobTitle(companyNameAndJobTitle);
              }}
              placeholder="Job title, keywords, or company"
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
              list="companyNamesAndJobTitles"
              value={this.state.companyNameAndJobTitle}
            />
            <datalist id="companyNamesAndJobTitles">
              {this.state.companyNameAndJobTitleSearchResults.map((data) => (
                <option
                  key={data}
                  value={data}
                  onClick={(e) =>
                    this.updateCompanyNameAndJobTitle(e.target.textContent)
                  }
                >
                  {data}
                </option>
              ))}
            </datalist>
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
            <SearchBox
              onChange={(location) => {
                this.updateLocation(location);
              }}
              placeholder="Job title, keywords, or company"
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
              list="locations"
              value={this.state.location}
            />
            <datalist id="locations">
              {this.state.locationSearchResults.map((data) => (
                <option
                  key={data}
                  value={data}
                  onClick={(e) => this.updateLocation(e.target.textContent)}
                >
                  {data}
                </option>
              ))}
            </datalist>
          </div>

          <Link
            className="btn"
            to={url}
            style={{
              backgroundColor: "#2557a7",
              color: "white",
              textDecorationColor: "none",
              marginTop: "27px",
              marginBottom: "2px",
              borderRadius: "10px",
              height: "40px",
            }}
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
