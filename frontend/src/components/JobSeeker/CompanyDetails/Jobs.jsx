import React from "react";
import Input from "../../common/Input";
import JobCard from "./JobCard";
import { getJobPostings } from "../../../services/jobSeeker";

class Jobs extends React.Component {
  pageSize = 10;
  state = {
    whatInput: undefined,
    whereInput: undefined,
    jobListing: [],
    currentJobId: 0,
    filteredJobs: [],
    currentPage: 1,
  };

  componentDidMount = async () => {
    const res = await getJobPostings(this.props.companyDetails._id);
    this.setState({
      jobListing: res.data,
      filteredJobs: res.data,
      currentJobId: res.data[0]._id,
    });
  };

  getJobsInCurrentPage = () => {
    let filteredJobs = [...this.state.filteredJobs];
    let start = (this.state.currentPage - 1) * this.pageSize;
    return filteredJobs.slice(start, start + this.pageSize);
  };

  setCurrentJobInCurrentPage = () => {
    let start = (this.state.currentPage - 1) * this.pageSize;
    if (start < this.state.jobListing.length) {
      this.setState({ currentJobId: this.state.jobListing[start]._id });
    }
  };

  goToNextPage = () => {
    const currentPage = this.state.currentPage;
    this.setState({ currentPage: currentPage + 1 }, () => {
      this.setCurrentJobInCurrentPage();
    });
  };

  goToPrevPage = () => {
    const currentPage = this.state.currentPage;
    this.setState({ currentPage: currentPage - 1 }, () => {
      this.setCurrentJobInCurrentPage();
    });
  };

  setCurrentJob = (jobId) => {
    this.setState({ currentJobId: jobId });
  };

  handleFilter = () => {
    let filteredJobs = [...this.state.jobListing];
    if (this.state.whatInput) {
      filteredJobs = this.state.jobListing.filter((job) => {
        return job.jobTitle
          .toLowerCase()
          .includes(this.state.whatInput.toLowerCase());
      });
    }
    if (this.state.whereInput) {
      filteredJobs = filteredJobs.filter((job) => {
        if (isNaN(this.state.whereInput)) {
          return (
            job.location.city
              .toLowerCase()
              .includes(this.state.whereInput.toLowerCase()) ||
            job.location.state
              .toLowerCase()
              .includes(this.state.whereInput.toLowerCase())
          );
        } else {
          return job.location.zipcode === this.state.whereInput;
        }
      });
    }
    this.setState({
      filteredJobs,
      currentJobId: filteredJobs.length > 0 ? filteredJobs[0]._id : undefined,
      currentPage: 1,
    });
  };

  render() {
    const currentJob = this.getJobsInCurrentPage().find(
      (job) => job._id === this.state.currentJobId
    );
    return (
      <div className="mb-4">
        <div className="mt-4 mb-4">
          <h4>
            <b>{this.props?.companyDetails?.name}.com Jobs</b>
          </h4>
          <div className="mt-3 d-flex flex-row justify-content-between">
            <div>
              <h6>What</h6>
              <p
                style={{ color: "#6f6f6f", fontSize: "14px", marginTop: "0px" }}
              >
                job title, keywords
              </p>
              <Input
                style={{ width: "400px", height: "50px" }}
                name="whatInput"
                id="whatInput"
                className="bold-input"
                onChange={(e) => {
                  this.setState({ whatInput: e.target.value });
                }}
              />
            </div>
            <div>
              <h6>Where</h6>
              <p
                style={{ color: "#6f6f6f", fontSize: "14px", marginTop: "0px" }}
              >
                city, state, or zip
              </p>
              <Input
                style={{ width: "400px", height: "50px" }}
                name="whereInput"
                id="whereInput"
                className="bold-input"
                onChange={(e) => {
                  this.setState({ whereInput: e.target.value });
                }}
              />
            </div>
            <button
              className="align-self-end submit-btn"
              style={{ background: "#085ff7", width: "120px" }}
              onClick={this.handleFilter}
            >
              Find Jobs
            </button>
          </div>
        </div>
        <div className="p-3" style={{ backgroundColor: "#f3f2f1" }}>
          <div className="d-flex flex-row">
            <div className="jobListItem me-2">
              {this.getJobsInCurrentPage().map((job) => (
                <JobCard
                  jobDetails={job}
                  setCurrentJob={this.setCurrentJob}
                  isActive={job._id == this.state.currentJobId}
                />
              ))}
            </div>
            <div style={{ width: "100%" }}>
              <div
                className="bg-white p-3"
                style={{
                  borderBottom: "2px solid #f2f2f2",
                  borderTop: "4px solid red",
                  boxShadow: "0 4px 4px rgb(0 0 0 / 8%)",
                }}
              >
                <div class="job-desc-title">
                  <img src="https://picsum.photos/50/50" alt="company-logo" />
                  <div>
                    <h6 className="ps-3">
                      <b>{currentJob?.jobTitle}</b>
                    </h6>
                    <span className="p-3">
                      {currentJob?.location.city}, {currentJob?.location.state}
                    </span>
                  </div>
                </div>
                <button
                  className="submit-btn ms-2"
                  style={{
                    background: "#085ff7",
                    fontSize: "18px",
                    width: "fit-content",
                    padding: "0 20px",
                  }}
                >
                  Apply on company site
                </button>
              </div>
              <div className="job-desc p-4">
                <h6>
                  <b>Job Overview</b>
                </h6>
                <p>
                  You’ll be part of the Amazon grocery team that supports one of
                  Amazon’s busiest services: online grocery orders. It’s similar
                  to a shopper role, except that you’ll be working in a grocery
                  warehouse, but it’s not like our other bigger buildings, it’s
                  more like the size of a grocery store. Amazon Fresh offers
                  customers everything from cereal to ice cream to fresh
                  flowers, so you’ll be preparing orders for customers, working
                  in different environments – including refrigerated and freezer
                  spaces for part of your shift. It can be cold, but we’ll
                  provide you with the right gear to stay warm!
                </p>
                <h6>Duties & Responsibilities</h6>
                <p>{currentJob?.responsibilities}</p>
                {/* <ul>
                  <li>Prepare grocery orders for delivery</li>
                  <li>Prepare grocery orders for delivery</li>
                  <li>Prepare grocery orders for delivery</li>
                  <li>Prepare grocery orders for delivery</li>
                  <li>Prepare grocery orders for delivery</li>
                  <li>Prepare grocery orders for delivery</li>
                </ul> */}
              </div>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-around">
            <div>
              <button
                className="invisibleButton"
                onClick={this.goToPrevPage}
                disabled={this.state.currentPage === 1}
              >
                <i
                  className="fa fa-arrow-circle-left fa-lg"
                  aria-hidden="true"
                ></i>
              </button>
              {this.state.currentPage}
              <button
                className="invisibleButton"
                onClick={this.goToNextPage}
                disabled={
                  this.state.currentPage ===
                  Math.ceil(this.state.filteredJobs.length / this.pageSize)
                }
              >
                <i
                  className="fa fa-arrow-circle-right fa-lg"
                  aria-hidden="true"
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Jobs;
