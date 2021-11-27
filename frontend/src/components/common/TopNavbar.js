import React from "react";
import { NavLink } from "react-router-dom";
import IndeedLogo from "./IndeedLogo";

// const indeedLogo = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Indeed_logo.svg/2560px-Indeed_logo.svg.png";

const TopNavbar = () => {
  let isAuthenticated = 0;
  let navRight1 = null;

  if (!isAuthenticated) {
    navRight1 = (
      <>
        <NavLink activeClassName="active" to="/chat" className="navbar-buttons">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="20"
            fill="currentColor"
            className="bi bi-chat-left-text-fill"
            viewBox="0 0 20 20"
          >
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z" />
          </svg>
        </NavLink>
        <NavLink
          activeClassName="active"
          to="/notifications"
          className="navbar-buttons"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="20"
            fill="currentColor"
            className="bi bi-bell-fill"
            viewBox="0 0 20 20"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
          </svg>
        </NavLink>
        <NavLink
          activeClassName="active"
          to="/jobSeekerprofile"
          className="navbar-buttons"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="20"
            fill="currentColor"
            className="bi bi-person-fill"
            viewBox="0 0 20 20"

          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        </NavLink>
      </>
    );
  } else {
    navRight1 = (
      <>
        <NavLink
          activeClassName="active"
          to="/postResume"
          className="navbar-buttons"
        >
          Post Your Resume
        </NavLink>
        <NavLink
          activeClassName="active"
          to="/signIn"
          className="navbar-buttons"
        >
          Sign In
        </NavLink>
      </>
    );
  }

  return (
    <nav className="navbar">
      <div className="nav-left">
        <IndeedLogo />
        <div className="nav-left-tabs">
          <NavLink
            exact={true}
            activeClassName="active"
            to="/jobSeekerLandingPage"
            className="navbar-buttons"
          >
            Find jobs
          </NavLink>
          <NavLink
            activeClassName="active"
            to="/jobSeeker/reviews"
            className="navbar-buttons"
          >
            Company reviews
          </NavLink>
          <NavLink
            activeClassName="active"
            to="/jobSeeker/salaries"
            className="navbar-buttons"
          >
            Find salaries
          </NavLink>
        </div>
      </div>
      <div className="nav-right">
        <div className="nav-right-1">{navRight1}</div>
        <div className="nav-right-2">
          <NavLink
            activeClassName="active"
            to="/employerPostJob"
            className="navbar-buttons"
          >
            Employers/ Post Job
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
