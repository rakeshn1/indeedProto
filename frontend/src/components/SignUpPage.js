import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { NavLink } from "react-router-dom";
import { addAccount } from "../services/auth";
import Button from "./common/Button";
import IndeedLogo from "./common/IndeedLogo";
import Input from "./common/Input";

const SignupPage = () => {
  let [emailId, setEmailId] = useState();
  let [password, setPassword] = useState();
  let [emailIdError, setEmailIdError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  // let [role, setRole] = useState();

  const history = useHistory();
  let [isEmployer, setIsEmployer] = useState(false);
  let [isJobSeeker, setIsJobSeeker] = useState(true);
  let [message, setMessage] = useState();
  const handleEmailIdChange = (e) => {
    // console.log("________");
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (!pattern.test(e.target.value)) {
      setEmailIdError("Enter Valid Email Address");
    } else {
      setEmailIdError("");
    }
    console.log(e.target.value);
    setEmailId(e.target.value);
    setMessage();
  };

  const handlePasswordChange = (e) => {
    if (e.target.value.length === 0) {
      setPasswordError("Please enter a password");
    } else {
      setPasswordError("");
    }
    console.log(e.target.value);
    setPassword(e.target.value);
    setMessage();
  };

  const createAccountHandler = async (e) => {
    console.log("Creating...");
    console.log("E", isEmployer);
    console.log("J", isJobSeeker);

    let role;
    if (isEmployer === true) role = 1;
    else role = 2;

    let payload = {
      email: emailId,
      password: password,
      role: role,
    };
    try {
      const result = await addAccount(payload);
      console.log("after call", result.data.status);
      if (result.data.status === 200) history.push("/login");
      else setMessage(" User with credentials already present, please SignIn");

      console.log("done");
    } catch {
      console.log("error");
      setMessage("Error Creating New Account");
    }
  };

  const handleEmployerSelect = async (e) => {
    setIsEmployer(true);
    setIsJobSeeker(false);

    // console.log(e.target.checked)

    console.log("E", isEmployer);
    console.log("J", isJobSeeker);
    // return e.target.checked;
  };
  const handleJobSeekerSelect = async (e) => {
    setIsJobSeeker(true);
    setIsEmployer(false);

    console.log("E", isEmployer);
    console.log("J", isJobSeeker);
  };
  return (
    <div className="sign-in-page-wrapper">
      <div>
        <IndeedLogo
          style={{
            padding: "30px",
          }}
        />
      </div>

      <div className="sign-in-box-wrapper">
        <h4>
          <b>Create an Account (it's free) </b>{" "}
        </h4>
        <p>
          By creating an account, you agree to Indeed's Terms of Service, Cookie
          Policy and Privacy Policy. You consent to receiving marketing messages
          from Indeed and may opt out from receiving such messages by following
          the unsubscribe link in our messages, or as detailed in our terms.
        </p>
        <Input
          label="Email Address"
          required
          style={{
            width: "100%",
            border: "1px solid #696969",
            // marginBottom: "20px",
            color: "black",
          }}
          className="input-styler"
          onChange={handleEmailIdChange}
          type="email"
        />
        {emailIdError && (
          <div className="alert alert-danger" style={{ marginBottom: "20px" }}>
            {emailIdError}
          </div>
        )}
        <Input
          label="Password"
          required="true"
          style={{
            width: "100%",
            border: "1px solid #696969",
            // marginBottom: "20px",
            color: "black",
          }}
          className="input-styler"
          onChange={handlePasswordChange}
          type="password"
        />
        {passwordError && (
          <div className="alert alert-danger" style={{ marginBottom: "20px" }}>
            {passwordError}
          </div>
        )}
        <p></p>
        <div className="role-selection-wrapper">
          <p style={{ color: "black" }}>
            <b>Your role</b> <span className="required">*</span>{" "}
          </p>
          <p>Let us know how you'll be using our products</p>
          <div class="form-check">
            <input
              class="form-inp"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              onClick={handleEmployerSelect}
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Employer
            </label>
          </div>
          <div class="form-check">
            <input
              defaultChecked
              class="form-inp"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              onClick={handleJobSeekerSelect}
            />
            <label class="form-check-label" for="flexRadioDefault2">
              Job Seeker
            </label>
          </div>
        </div>
        <Button
          text="Create Account"
          disabled={
            !emailIdError && !passwordError && emailId && password
              ? ""
              : "disabled"
          }
          onClick={createAccountHandler}
          style={{
            width: "100%",
          }}
        />
        <br />
        {message && (
          <p style={{ marginTop: "-20px", fontSize: "15px", color: "red" }}>
            {message}
          </p>
        )}
        <div style={{ color: "#2557a7" }}>
          <NavLink to="/login">Have an account? Sign in </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
