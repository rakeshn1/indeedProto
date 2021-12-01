import React from "react";
import Input from "../../common/Input";
import JobCard from "./JobCard";
import { getJobPostings } from "../../../services/jobSeeker";

class Jobs extends React.Component {
  state = {
    whatInput: undefined,
    whereInput: undefined,
  };

  componentDidMount = async (id) => {
    getJobPostings(id);
  };

  render() {
    return (
      <div>
        <div className="mt-4 mb-4">
          <h4>
            <b>Amazon.com Jobs</b>
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
              />
            </div>
            <button
              className="align-self-end submit-btn"
              style={{ background: "#085ff7", width: "120px" }}
            >
              Find Jobs
            </button>
          </div>
        </div>
        <div className="p-3" style={{ backgroundColor: "#f3f2f1" }}>
          jobs near Seattle, WA
          <div className="mt-4 d-flex flex-row">
            <div className="jobListItem me-2">
              <JobCard />
              <JobCard />
              <JobCard />
              <JobCard />
              <JobCard />
              <JobCard />
              <JobCard />
              <JobCard />
              <JobCard />
              <JobCard />
              <JobCard />
              <JobCard />
              <JobCard />
              <JobCard />
              <JobCard />
              <JobCard />
            </div>
            <div className="" style={{ width: "100%" }}>
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
                      <b>
                        Amazon Grocery Fresh Associate - Up To $3,000 Sign-On
                        Bonus & bonus
                      </b>
                    </h6>
                    <span className="p-3">City, State</span>
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
                <p>Some of your duties may include:</p>
                <ul>
                  <li>Prepare grocery orders for delivery</li>
                  <li>Prepare grocery orders for delivery</li>
                  <li>Prepare grocery orders for delivery</li>
                  <li>Prepare grocery orders for delivery</li>
                  <li>Prepare grocery orders for delivery</li>
                  <li>Prepare grocery orders for delivery</li>
                </ul>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Jobs;
