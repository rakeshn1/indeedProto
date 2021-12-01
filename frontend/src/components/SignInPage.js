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
    console.log(e.target.value);
    setEmailId(e.target.value);
  };

  const handlePasswordChange = (e) => {
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
          onChange={handleEmailIdChange}
        />
        <Input
          label="Password"
          required
          style={{
            width: "100%",
            border: "1px solid #696969",
            marginBottom: "20px",
            color: "black",
          }}
          onChange={handlePasswordChange}
          type="password"
        />
        <Button
          text="SignIn"
          onClick={authenticate}
          style={{
            width: "100%",
          }}
        />
        <div style={{ backgroundColor: "yellow" }}>{message}</div>
        <div style={{ marginTop: "20px", color: "#2557a7" }}>
          <NavLink to="/signUp">New user? Sign up </NavLink>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerSignIn;
