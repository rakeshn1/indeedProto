import React from "react";
import { Link } from "react-router-dom";

const JobCard = (props) => {
  //   const className =
  //     props.selecetdJobCard === props.card._id
  //       ? "job-card-wrapper border border-dark border-2"
  //       : "job-card-wrapper";
  return (
    <div
      className="job-card-wrapper"
      // active={true}
      style={
        props.selecetdJobCard === props.card._id
          ? { border: "1px solid #2557a7" }
          : {}
      }
      onClick={() => props.onClick(props?.card._id)}
    >
      <div className="job-title">
        <div>
          <span>{props.card?.jobTitle}</span>
        </div>
      </div>

      <div className="job-card-company-details">
        <span>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/companyDetails/${props.card?.companyId}`}
          >
            {props.card?.companyName}
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
            {props.card?.location.city}, {props.card?.location.state},{" "}
            {props.card?.location.zipCode}
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
            {
              // (card.jobType === 0 ? "Part-Time" : (card.jobType === 2 ? "Full-Time" : "Remote"))
            }
          </span>
        </p>
      </div>
      <div className="job-card-salary">
        <span>$ {props.card?.salary} a year</span>
      </div>
      <div
        style={{ marginBottom: "10px", height: "60px" }}
        className="job-card-role-summary overflow-hidden"
      >
        {props?.card?.description}
      </div>

      <div className="job-card-posted-ago">
        {props.card?.datePosted}
        {/* 7 days ago */}
      </div>
    </div>
  );
};

export default JobCard;
