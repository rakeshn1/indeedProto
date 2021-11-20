import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import JobSeekerCompanyRow from "./JobSeekerCompanyRow";

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
    // const { companyName, location } = this.props.match.params;
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
      (this.props.match.params.companyName !==
        prevProps.match.params.companyName,
      this.props.match.params.location !== prevProps.match.params.location)
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
          paddingLeft: "150px",
          paddingRight: "100px",
          paddingTop: "70px",
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
            {/* <input
              type="text"
              onChange={(e) => {
                this.setState({
                  newCompanyName: e.target.value,
                });
              }}
            ></input> */}
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
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              this.onFindCompaniesClick();
            }}
          >
            {" "}
            Find Companies
          </button>
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
            Popular companies
            {this.props.match.params.companyName && (
              <span>
                for {this.props.match.params.companyName}
                {this.props.match.params.location && (
                  <span> in {this.props.match.params.location}</span>
                )}
              </span>
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
