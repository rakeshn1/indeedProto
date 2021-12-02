import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBox from "../common/SearchBox";
import JobSeekerSalariesCard from "./jobSeekerSalariesCard";
import JobsRankedRow from "./JobSeekerSalariesJobRanked";
import {
  getJobTitles,
  getLocations,
  getSalaryReviewsMainData,
  getSalaryReviewsRankedJobs,
} from "../../services/searchService";

class JobSeekerSalariesSearchPage extends React.Component {
  state = {
    jobTitle: "",
    location: "",
    newJobTitle: "",
    newLocation: "",
    numberOfReviews: 0,
    averageSalary: 0,
    companyJobTitleSearchResults: [],
    locationSearchResults: [],
    // rankedJobs: [
    //   {
    //     logo: "https://www.laurel-group.com/wp-content/uploads/amazon-logo-square-300x300.png",
    //     companyName: "Apple",
    //     rating: 1.2,
    //     reviewsCount: 10567,
    //     salaryReviewsCount: 15567,
    //     averageSalary: 176388,
    //   },
    //   {
    //     logo: "https://www.laurel-group.com/wp-content/uploads/amazon-logo-square-300x300.png",
    //     companyName: "Meta",
    //     rating: 2.7,
    //     reviewsCount: 10967,
    //     salaryReviewsCount: 15867,
    //     averageSalary: 175688,
    //   },
    //   {
    //     logo: "https://www.laurel-group.com/wp-content/uploads/amazon-logo-square-300x300.png",
    //     companyName: "Capital One",
    //     rating: 3.0,
    //     reviewsCount: 9567,
    //     salaryReviewsCount: 11567,
    //     averageSalary: 179388,
    //   },
    //   {
    //     logo: "https://www.laurel-group.com/wp-content/uploads/amazon-logo-square-300x300.png",
    //     companyName: "Samsang",
    //     rating: 4.9,
    //     reviewsCount: 19567,
    //     salaryReviewsCount: 25567,
    //     averageSalary: 196388,
    //   },
    //   {
    //     logo: "https://www.laurel-group.com/wp-content/uploads/amazon-logo-square-300x300.png",
    //     companyName: "Google",
    //     rating: 4.2,
    //     reviewsCount: 19967,
    //     salaryReviewsCount: 19567,
    //     averageSalary: 196388,
    //   },
    // ],
  };
  componentDidMount = () => {
    this.apiCall();
  };

  updateJobTitle = async (newJobTitle) => {
    await this.setState({
      newJobTitle,
    });
    if (newJobTitle) {
      console.log("if companyname: ", typeof newJobTitle);
      const { data: companyJobTitleSearchResults } = await getJobTitles(
        newJobTitle
      );
      console.log(
        "companyJobTitleSearchResults: ",
        companyJobTitleSearchResults
      );
      await this.setState({ companyJobTitleSearchResults });
    }
  };

  updateLocation = async (newLocation) => {
    this.setState({ newLocation });
    if (newLocation) {
      const { data: locationSearchResults } = await getLocations(newLocation);
      this.setState({ locationSearchResults });
    }
  };

  componentDidUpdate(prevProps) {
    // console.log(
    //   this.props.match.params.newLocation,
    //   prevProps.match.params.newLocation
    // );
    if (
      this.props.match.params.jobTitle !== prevProps.match.params.jobTitle ||
      this.props.match.params.location !== prevProps.match.params.location
    ) {
      this.apiCall();
    }
  }

  apiCall = async () => {
    const { jobTitle, location } = this.props.match.params;
    const { data } = await getSalaryReviewsMainData(jobTitle, location);
    console.log("data: ", data);
    this.setState({
      numberOfReviews: data[0].numberOfReviews,
      averageSalary: data[0].averageSalary.toFixed(),
    });
    const { data: rankedJobs } = await getSalaryReviewsRankedJobs(
      jobTitle,
      location
    );

    this.setState({ rankedJobs });

    this.setState({
      jobTitle,
      location,
      newJobTitle: jobTitle,
      newLocation: location,
    });
  };

  render() {
    return (
      <div
        className="container"
        style={{
          paddingBottom: "30px",
          width: "70%",
        }}
      >
        <h2
          style={{
            fontSize: "2.625rem",
            fontWeight: "700",
            letterSpacing: "-.5px",
          }}
        >
          Build a career you'll love
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
              What
            </label>
            <SearchBox
              onChange={(jobTitle) => this.updateJobTitle(jobTitle)}
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
              list="jobTitleResults1"
              style={{
                marginLeft: "0px",
                height: "40px",
                width: "90%",
              }}
              value={this.state.newJobTitle}
            />
            <datalist id="jobTitleResults1">
              {this.state.companyJobTitleSearchResults.map((data) => (
                <option
                  key={data}
                  value={data}
                  onClick={(e) => this.updateJobTitle(e.target.textContent)}
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
              Where
            </label>
            <SearchBox
              onChange={(location) => this.updateLocation(location)}
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
              list="locationResults2"
              value={this.state.newLocation}
            />
            <datalist id="locationResults2">
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
            to={`/jobSeeker/salaries/search/${this.state.newJobTitle}/${this.state.newLocation}`}
            style={{
              width: "90px",
              hight: "45px",
              border: "1px solid #065FF7",
              //   backgroundColor: "#065FF7",
              color: "#065FF7",
              textDecorationColor: "none",
              marginTop: "27px",
              marginBottom: "2px",
              borderRadius: "10px",
            }}
          >
            Search
          </Link>
        </div>

        <div>
          <h1
            style={{
              fontSize: "1.875rem",
              letterSpacing: "-.12px",
              fontWeight: "700",
              lineHeight: "1.14",
              marginTop: "60px",
            }}
          >
            {this.state.jobTitle} salary in {this.state.location}
          </h1>
          <h2
            style={{
              marginBottom: "1.5rem",
              color: "#767676",
              fontSize: "0.875rem",
              lineHeight: "1.5",
              fontWeight: "400",
            }}
          >
            How much does a {this.state.jobTitle} make in the{" "}
            {this.state.location}?
          </h2>
        </div>
        <JobSeekerSalariesCard
          jobTitle={this.state.jobTitle}
          location={this.state.location}
          numberOfReviews={this.state.numberOfReviews}
          averageSalary={this.state.averageSalary}
        ></JobSeekerSalariesCard>
        <h2
          style={{
            marginTop: "40px",
            fontSize: "1.875rem",
            letterSpacing: "-.12px",
            fontWeight: "700",
            lineHeight: "1.14",
          }}
        >
          Top companies for {this.state.jobTitle} in {this.state.location}
        </h2>
        <div
          style={{
            border: "2px solid #ececec",
            borderRadius: "8px",
            overflow: "hidden",
            marginTop: "30px",
          }}
        >
          {this.state.rankedJobs &&
            this.state.rankedJobs.map((job) => {
              return <JobsRankedRow {...job}></JobsRankedRow>;
            })}
        </div>
      </div>
    );
  }
}

export default JobSeekerSalariesSearchPage;
