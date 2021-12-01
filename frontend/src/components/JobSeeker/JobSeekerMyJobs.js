import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/auth";
import {
  getSavedJobsWithDesc,
  handleJobSaveUnsave,
  getAppliedJobsWithDesc,
} from "../../services/jobSeeker";
import { NavLink } from "react-router-dom";
import JobSeekerAppliedJobs from "./JobSeekerAppliedJobs";
import JobSeekerSavedJobs from "./JobSeekerSavedJobs";

const JobSeekerMyJobs = (props) => {
  const user = getCurrentUser();
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    fetchSavedJobs();
    fetchAppliedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    if (user) {
      const { data } = await getSavedJobsWithDesc({ userId: user._id });
      console.log("responseSaved: ", data);
      setSavedJobs(data);
    }
  };

  const fetchAppliedJobs = async () => {
    if (user) {
      const { data } = await getAppliedJobsWithDesc({ userId: user._id });
      console.log("responseApplied: ", data);
      setAppliedJobs(data);
    }
  };
  return (
    <div className="container">
      <div className="heading-my-jobs">My jobs</div>

      <div
        className="nav-left-tabs"
        style={{
          marginTop: "55x",
          display: "flex",
          borderBottom: "1px solid silver",
        }}
      >
        <NavLink
          exact={true}
          activeClassName="active"
          to="/jobSeeker/myJobs/savedJobs"
          className="navbar-buttons"
          style={{ width: "100px", display: "flex", fontSize: "16px" }}
        >
          Saved
          <div className="count-holder"> {savedJobs.length}</div>
        </NavLink>

        <NavLink
          activeClassName="active"
          style={{ width: "100px", display: "flex", fontSize: "16px" }}
          to="/jobSeeker/myJobs/appliedJobs"
          className="navbar-buttons"
        >
          Applied <div className="count-holder">{appliedJobs.length}</div>{" "}
        </NavLink>
      </div>

      {props.location.pathname === "/jobSeeker/myJobs/savedJobs" && (
        <JobSeekerSavedJobs
          savedJobs={savedJobs}
          appliedJobs={appliedJobs}
          fetchAppliedJobs={fetchAppliedJobs}
          fetchSavedJobs={fetchSavedJobs}
        />
      )}

      {props.location.pathname === "/jobSeeker/myJobs/appliedJobs" && (
        <JobSeekerAppliedJobs appliedJobs={appliedJobs} />
      )}
    </div>
  );
};

export default JobSeekerMyJobs;
