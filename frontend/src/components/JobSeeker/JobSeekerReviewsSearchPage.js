import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import JobSeekerCompanyRow from "./JobSeekerCompanyRow";
import SearchBox from "../common/SearchBox";
import Button from "../common/Button";

class JobSeekerReviewsSearchPage extends React.Component {
  state = {
    companyName: "",
    location: "",
    newCompanyName: "Amazon2",
    newLocation: "USA2",
    data: {
      companyName: "Amazon Play",
      learningScore: "3.5",
      description:
        "Our mission is to be Earth's most customer-centric company.",
      logo: "https://www.laurel-group.com/wp-content/uploads/amazon-logo-square-300x300.png",
    },
    newData: "",
  };

  //   UNSAFE_componentWillReceiveProps = () => {
  //     this.componentDidMount();
  //   };

  apiCall = async () => {
    const { companyName, location } = this.props.match.params;
    this.setState({
      companyName,
      location,
      newCompanyName: companyName,
      newLocation: location,
    });
    // console.log(this.props.match);
    // await this.setState({
    //   companyName,
    //   location,
    //   //   newCompanyName: companyName,
    //   //   newLocation: location,
    // });
    // console.log(this.state);
    // this.setState({
    //   newData: this.state.newData + "1t",
    //   newCompanyName: this.props.match.params.companyName,
    //   newLocation: this.props.match.params.newLocation,
    // });
    // console.log();
    console.log("API called");
  };

  componentDidMount = async () => {
    console.log("here");
    this.apiCall();
  };

  componentDidUpdate(prevProps) {
    console.log(
      this.props.match.params.newLocation,
      prevProps.match.params.newLocation
    );
    if (
      this.props.match.params.companyName !==
        prevProps.match.params.companyName ||
      this.props.match.params.location !== prevProps.match.params.location
    ) {
      this.apiCall();
    }
  }

  onFindCompaniesClick = () => {
    // return (
    //   <Redirect
    //     to={{
    //       pathname: `/jobSeeker/reviews/search/${this.state.newCompanyName}/${this.state.newLocation}`,
    //     }}
    //   ></Redirect>
    // );
    this.props.history.push(
      `/jobSeeker/reviews/search/${this.state.newCompanyName}/${this.state.newLocation}`
    );
  };

  render() {
    console.log("RENDER CALLED");
    let dataRow = [];
    for (let i = 0; i < 50; i++) {
      dataRow.push(this.state.data);
    }
    return (
      <div
        className="container"
        style={{
          fontFamily:
            "Noto Sans,Helvetica Neue,Helvetica,Arial,Liberation Sans,Roboto,Noto,sans-serif",
          width: "70%",
        }}
      >
        {/* <pre>{JSON.stringify(this.props.match, "", 2)}</pre>
        <pre>{JSON.stringify(this.state, "", 2)}</pre> */}

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
              onChange={(companyName) => {
                this.setState({ newCompanyName: companyName });
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
              value={this.state.newCompanyName}
            />
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
                this.setState({ newLocation: location });
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
              value={this.state.newLocation}
            />
          </div>
          {/* <button
            className="btn btn-primary"
            onClick={() => {
              this.onFindCompaniesClick();
            }}
          >
            {" "}
            Find Companies
          </button> */}
          <Button
            text="Find Companies"
            onClick={this.onFindCompaniesClick}
            style={{ marginTop: "21px", width: "150px" }}
          />
          {/* <Link
            className="btn btn-primary"
            to={`/jobSeeker/reviews/search/${this.state.newCompanyName}/${this.state.newLocation}`}
          >
            Find Companies
          </Link> */}
        </div>

        <div>
          <h2
            style={{
              lineHeight: "1.5",
              fontWeight: "700",
              fontSize: "1rem",
              marginTop: "20px",
            }}
          >
            Popular companies{" "}
            {this.state.companyName !== " " && (
              <span>for {this.state.companyName}</span>
            )}
            {this.state.location !== " " && (
              <span> in {this.state.location}</span>
            )}
          </h2>
          <p
            style={{
              color: "#595959",
              fontSize: "0.875rem",
              fontWeight: "500",
              lineHeight: "1.5",
              marginTop: "-7px",
            }}
          >
            Based on reviews and recent job openings on Indeed
          </p>
        </div>

        <div>
          {dataRow.map((row) => {
            return <JobSeekerCompanyRow {...row}></JobSeekerCompanyRow>;
          })}
        </div>
      </div>
    );
  }
}

export default JobSeekerReviewsSearchPage;
