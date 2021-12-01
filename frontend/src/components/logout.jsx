import React, { Component } from "react";
import { getCurrentUser, logout } from "../services/auth";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  componentDidMount() {
    const user = getCurrentUser();
    console.log("Got user data again in LOGOUT: ", user);
    if (user) {
      logout();
      window.location = "/";
    } else {
      <Redirect
        to={{
          pathname: "/jobSeekerLandingPage",
        }}
      ></Redirect>;
    }
  }

  render() {
    return null;
  }
}

export default Logout;
