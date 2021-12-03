import React, { useEffect, useState } from "react";
import {
  applyJob,
  getJobSeekerDetails,
  getSavedJobs,
  getAppliedJobs,
  handleJobSaveUnsave,
} from "../../services/jobSeeker";
import Button from "../common/Button";
import _ from "lodash";
import { useHistory } from "react-router";
import { getCurrentUser } from "../../services/auth";
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AddResumeModal from "./AddResumeModal";
import { Modal, Button as BT } from 'react-bootstrap'

const JobDescriptionCard = (props) => {
  const [auth, setAuth] = useState(true);
  const resume = "";

  const user = getCurrentUser();

  const history = useHistory();
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [show, setShow] = useState(false)
  const [heart_Icon, setHeartIcon] = useState(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="38"
      fill="currentColor"
      class="bi bi-heart"
      viewBox="-5 -3 25 25"
    >
      <path d="M12.38,2.25A4.49,4.49,0,0,0,9,3.82,4.49,4.49,0,0,0,5.63,2.25,4.08,4.08,0,0,0,1.5,6.38c0,2.83,2.55,5.15,6.41,8.66L9,16l1.09-1C14,11.52,16.5,9.21,16.5,6.38A4.08,4.08,0,0,0,12.38,2.25ZM9.08,13.91L9,14l-0.08-.08C5.35,10.68,3,8.54,3,6.38A2.56,2.56,0,0,1,5.63,3.75,2.93,2.93,0,0,1,8.3,5.52H9.7a2.91,2.91,0,0,1,2.67-1.77A2.56,2.56,0,0,1,15,6.38C15,8.54,12.65,10.68,9.08,13.91Z" />
    </svg>
  );

  useEffect(() => {
    fetchSavedJobs();
    fetchAppliedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    if (user) {
      const { data } = await getSavedJobs({ userId: user._id });
      console.log("response: ", data);
      setSavedJobs(data);
    }
  };

  const fetchAppliedJobs = async () => {
    if (user) {
      const { data } = await getAppliedJobs({ userId: user._id });
      console.log("response: ", data);
      setAppliedJobs(data);
    }
  };

  const handleSavedJobs = async (jobId) => {
    if (!user) {
      history.push("/login");
      return;
    }
    console.log("JobId", jobId);
    console.log("User: ", user);
    const payload = {
      jobId,
      userId: user._id,
    };
    await handleJobSaveUnsave(payload);
    const { data } = await getSavedJobs({ userId: user._id });
    console.log("response: ", data);
    setSavedJobs(data);
  };

  const handleApplyJob = async () => {
    if (!user) {
      history.push("/login");
      return;
    }
    const p = {
      userId: user._id,
    };
    const userDetails = await getJobSeekerDetails(p);
    console.log("applying job for user with details", userDetails.data);

    // let mod = null
    if (userDetails && !userDetails.data.resume) {
      setShow(true)
    } else {
      const payload = {
        jobId: props.cardDetails._id,
        userId: user._id,
        companyId: props.cardDetails.companyId,
        resumeURL: userDetails.data.resume,
        coverLetterURL: userDetails.data.coverLetter,
      };

      const result = await applyJob(payload);
      console.log("after call", result.data.status);
    }
    fetchAppliedJobs();
  };
  return (
    <div className="job-description-card-wrapper">
      <div className="job-description-header">
        <div className="job-title">
          <div>
            <span>{props.cardDetails?.jobTitle} </span>
          </div>
        </div>

        {show && (
          <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add Resume </Modal.Title>
            </Modal.Header>
            <Modal.Body>You do not have an uploaded resume. Please add a resume from the profile page.</Modal.Body>
            <Modal.Footer>
              <BT variant="secondary" onClick={() => setShow(false)}>
                Close
              </BT>
              <BT variant="primary" onClick={() => {
                history.push('/jobSeekerProfile')
                setShow(false)
              }

              }>
                Add Resume
              </BT>
            </Modal.Footer>
          </Modal>
        )}


        <div className="job-card-company-details">
          <span>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/companyDetails/${props.cardDetails?.companyId}`}
            >
              {props.cardDetails?.companyName}
            </Link>{" "}
            <b> 4.3 </b>{" "}
            <svg
              width="18"
              height="18"
              fill="currentColor"
              viewBox="5 0 18 22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8.805 4.134a.206.206 0 01.385 0l1.312 3.203 3.307.317c.184.018.258.257.12.385l-2.498 2.298.732 3.394c.04.188-.154.336-.312.238l-2.854-1.777-2.853 1.776c-.158.099-.352-.05-.311-.238l.736-3.393-2.497-2.298c-.139-.128-.065-.367.119-.385l3.307-.317 1.307-3.203z" />
            </svg>
          </span>
        </div>
        <div>
          <p>
            <span>
              {props.cardDetails?.location.city},{" "}
              {props.cardDetails?.location.state},{" "}
              {props.cardDetails?.location.zipcode}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-dot"
                viewBox="0 0 16 20"
              >
                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
              </svg>
              {props?.cardDetails?.jobType === 0 && "Full Time"}
              {props?.cardDetails?.jobType === 1 && "Part Time"}
              {props?.cardDetails?.jobType === 2 && "Remote"}
            </span>
          </p>
        </div>
        <div className="buttons-in-a-line-wrapper">
          {!_.find(appliedJobs, (job) => {
            return job.toString() === props.cardDetails._id.toString();
          }) && (
              <Button
                text="Apply now"
                // disabled={user ? false : true}
                style={{
                  height: "40px",
                  width: "120px",
                  fontSize: "15px",
                }}
                onClick={handleApplyJob}
              />
            )}

          {_.find(appliedJobs, (job) => {
            return job.toString() === props.cardDetails._id.toString();
          }) && (
              <Button
                text="Applied"
                disabled
                style={{
                  backgroundColor: "green",
                  height: "40px",
                  width: "120px",
                  fontSize: "15px",
                }}
              // onClick={handleApplyJob}
              />
            )}
          {/* {

                    } */}
          {console.log(
            "FAV: ",
            _.find(savedJobs, (job) => {
              return job.toString() === props.cardDetails._id.toString();
            })
          )}

          {_.find(savedJobs, (job) => {
            return job.toString() === props.cardDetails._id.toString();
          }) && (
              <div className="heart-button">
                <button
                  disabled={user ? "" : "disabled"}
                  onClick={() => handleSavedJobs(props.cardDetails?._id)}
                >
                  {/* {heart_Icon} */}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="38"
                    fill="currentColor"
                    class="bi bi-heart"
                    viewBox="-2 -2 25 25"
                  >
                    <path d="M12,21.35L10.55,20C5.4,15.36,2,12.28,2,8.5A5.45,5.45,0,0,1,7.5,3,6,6,0,0,1,12,5.09,6,6,0,0,1,16.5,3,5.45,5.45,0,0,1,22,8.5c0,3.78-3.4,6.86-8.55,11.54Z" />
                  </svg>
                </button>
              </div>
            )}

          {!_.find(savedJobs, (job) => {
            return job.toString() === props.cardDetails._id.toString();
          }) && (
              <div className="heart-button">
                <button
                  // disabled={user ? "" : "disabled"}
                  onClick={() => handleSavedJobs(props.cardDetails?._id)}
                >
                  {/* {heart_Icon} */}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="38"
                    fill="black"
                    class="bi bi-heart"
                    viewBox="-5 -3 25 25"
                  >
                    <path d="M12.38,2.25A4.49,4.49,0,0,0,9,3.82,4.49,4.49,0,0,0,5.63,2.25,4.08,4.08,0,0,0,1.5,6.38c0,2.83,2.55,5.15,6.41,8.66L9,16l1.09-1C14,11.52,16.5,9.21,16.5,6.38A4.08,4.08,0,0,0,12.38,2.25ZM9.08,13.91L9,14l-0.08-.08C5.35,10.68,3,8.54,3,6.38A2.56,2.56,0,0,1,5.63,3.75,2.93,2.93,0,0,1,8.3,5.52H9.7a2.91,2.91,0,0,1,2.67-1.77A2.56,2.56,0,0,1,15,6.38C15,8.54,12.65,10.68,9.08,13.91Z" />
                  </svg>
                </button>
              </div>
            )}
        </div>
      </div>
      <div className="job-description-content-wrapper">
        <div>
          <h4>
            <b>Job Details</b>
          </h4>
          <p>
            <b>Salary:</b> ${props.cardDetails?.salary}
          </p>
          <p>
            <b>JobType: </b>
            {props?.cardDetails?.jobType === 0 && "Full Time"}
            {props?.cardDetails?.jobType === 1 && "Part Time"}
            {props?.cardDetails?.jobType === 2 && "Remote"}
          </p>
        </div>

        <div>
          <h5>
            <b>Full Job Description</b>
          </h5>
          <p>{props.cardDetails?.description}</p>
          <p>
            <b>Location:</b> {props.cardDetails?.location.city},{" "}
            {props.cardDetails?.location.state},{" "}
            {props.cardDetails?.location.zipcode}{" "}
          </p>
          <p>
            <b>Compensation:</b> ${props.cardDetails?.salary}
          </p>

          <h5>
            <b>Responsibilities</b>
          </h5>
          <p>
            <b>What You'll Do</b>
          </p>
          <p>{props.cardDetails?.responsibilities}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionCard;

//Liked Button
{
  /* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 20 20">
<path d="M12,21.35L10.55,20C5.4,15.36,2,12.28,2,8.5A5.45,5.45,0,0,1,7.5,3,6,6,0,0,1,12,5.09,6,6,0,0,1,16.5,3,5.45,5.45,0,0,1,22,8.5c0,3.78-3.4,6.86-8.55,11.54Z" />
</svg> */
}