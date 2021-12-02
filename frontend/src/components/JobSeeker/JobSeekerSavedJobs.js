import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/auth";
import {
  getSavedJobs,
  handleJobSaveUnsave,
  getAppliedJobs,
  applyJob,
  getJobSeekerDetails,
} from "../../services/jobSeeker";
import Button from "../common/Button";
import _ from "lodash";
import { useHistory } from "react-router";

const JobSeekerSavedJobs = ({
  savedJobs,
  appliedJobs,
  fetchAppliedJobs,
  fetchSavedJobs,
}) => {
  const history = useHistory();
  const user = getCurrentUser();

  const handleApplyNow = async (jobId, companyId) => {
    console.log("Applied: ", jobId, companyId);
    // const user = getCurrentUser();
    const p = {
      userId: user._id,
    };
    const userDetails = await getJobSeekerDetails(p);
    console.log("applying job for user with details", userDetails.data);
    console.log("U:", user);
    if (userDetails.data && !userDetails.data.resume) {
      alert("please add resume");
      history.push("/jobSeekerProfile");
    } else {
      const payload = {
        jobId: jobId,
        userId: user._id,
        companyId: companyId,
        resumeURL: userDetails.data.resume,
        coverLetterURL: userDetails.data.coverLetter,
      };

      const result = await applyJob(payload);
      console.log("after call", result.data.status);
    }
    fetchAppliedJobs();
  };

  const handleRemoveSavedJob = async (jobId) => {
    // console.log("JobId", jobId)
    const payload = {
      jobId,
      userId: user._id,
    };
    await handleJobSaveUnsave(payload);
    fetchSavedJobs();
  };

  return (
    <div className="container">
      {savedJobs.map((item) => {
        console.log("savedJob", item);
        const logo = item.companyLogo
          ? item.companyLogo
          : "https://www.oiltechconnect.com/front-end/img/default-logo.png";
        return (
          <div className="my-jobs-card">
            <div className="my-jobs-card-left">
              <div
                className="profile-circle"
                style={{ backgroundColor: "beige", border: "none" }}
              >
                <img src={logo} alt=""></img>{" "}
              </div>
              <div className="my-jobs-card-details">
                <div>
                  {" "}
                  <b> {item.jobTitle} </b>
                </div>
                <div>{item.companyName}</div>
                <div>
                  {item.location.city}, {item.location.state}
                </div>
              </div>
            </div>

            {console.log(
              "Hywejbfn biue: ",
              item._id,
              appliedJobs,
              !_.find(appliedJobs, (job) => {
                return job._id.toString() === item._id.toString();
              })
            )}

            <div className="my-jobs-card-right">
              {_.find(appliedJobs, (job) => {
                return job._id.toString() === item._id.toString();
              }) && (
                <Button
                  text="Applied"
                  style={{
                    width: "200px",
                    backgroundColor: "green",
                  }}
                  disabled
                  // onClick={()=>handleApplyNow()}
                />
              )}
              {!_.find(appliedJobs, (job) => {
                return job._id.toString() === item._id.toString();
              }) && (
                <Button
                  text="Apply Now"
                  style={{
                    width: "200px",
                    // backgroundColor: "green",
                  }}
                  // disabled
                  onClick={() => handleApplyNow(item._id, item.companyId)}
                />
              )}
              <div onClick={() => handleRemoveSavedJob(item._id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="m15.536 7.8987c-0.1953-0.19526-0.5119-0.19526-0.7071 0l-2.8284 2.8284-2.8285-2.8284c-0.19526-0.19527-0.51185-0.19527-0.70711 0l-0.56568 0.56568c-0.19527 0.19526-0.19526 0.51185 0 0.70711l2.8285 2.8284-2.8285 2.8285c-0.19526 0.1952-0.19526 0.5118 0 0.7071l0.56568 0.5657c0.19527 0.1952 0.51185 0.1952 0.70711 0l2.8285-2.8285 2.8284 2.8284c0.1952 0.1953 0.5118 0.1953 0.7071 0l0.5657-0.5657c0.1952-0.1953 0.1952-0.5118 0-0.7071l-2.8284-2.8284 2.8283-2.8284c0.1953-0.19526 0.1953-0.51184 0-0.70711l-0.5656-0.56568z" />
                </svg>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default JobSeekerSavedJobs;
