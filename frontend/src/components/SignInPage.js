import React, { useEffect, useState } from "react";
import { useHistory, useParams, Redirect, NavLink } from "react-router-dom";
import { login } from "../services/auth";
import Button from "./common/Button";
import IndeedLogo from "./common/IndeedLogo";
import Input from "./common/Input";

const JobSeekerSignIn = () => {
  // let { type } = us eParams();
  let [emailId, setEmailId] = useState();
  let [password, setPassword] = useState();
  // let [redirect, setRedirect] = useState(null)
  let [emailIdError, setEmailIdError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [message, setMessage] = useState();

  const history = useHistory();
  const authenticate = async () => {
    console.log("Email", emailId);
    console.log("Password", password);

    if (emailId && password) {
      const response = await login(emailId, password);
      // console.log("response.data", response)
      if (response) {
        console.log("Successful", response);
        history.push("/");
      } else setMessage("Incorrect Credentials");
    } else {
      setMessage("Please fill in all fields");
    }
  };

  const handleEmailIdChange = (e) => {
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
  };

  const handlePasswordChange = (e) => {
    if (e.target.value.length === 0) {
      setPasswordError("Please enter a password");
    } else {
      setPasswordError("");
    }
    console.log(e.target.value);
    setPassword(e.target.value);
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
          <b> Sign In</b>{" "}
        </h4>
        <p>
          By signing in to your account, you agree to Indeed's Terms, Cookie and
          Privacy policies.
        </p>
        <Input
          label="Email address"
          required
          style={{
            width: "100%",
            border: "1px solid #696969",
            marginBottom: "20px",
            color: "black",
          }}
          className="input-styler"
          onChange={handleEmailIdChange}
        />
        {emailIdError && (
          <div className="alert alert-danger" style={{ marginTop: "-20px" }}>
            {emailIdError}
          </div>
        )}
        <Input
          label="Password"
          required
          style={{
            width: "100%",
            border: "1px solid #696969",
            marginBottom: "20px",
            color: "black",
          }}
          className="input-styler"
          onChange={handlePasswordChange}
          type="password"
        />
        {passwordError && (
          <div className="alert alert-danger" style={{ marginTop: "-20px" }}>
            {passwordError}
          </div>
        )}
        <Button
          text="SignIn"
          onClick={authenticate}
          disabled={
            !emailIdError && !passwordError && emailId && password
              ? ""
              : "disabled"
          }
          style={{
            width: "100%",
            marginTop: "10px",
          }}
        />
        <br />
        {message && (
          <p style={{ marginTop: "-20px", fontSize: "15px", color: "red" }}>
            {message}
          </p>
        )}
        <div style={{ marginTop: "20px", color: "#2557a7" }}>
          <NavLink to="/signUp">New user? Sign up </NavLink>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerSignIn;
