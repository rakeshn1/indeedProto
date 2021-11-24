import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Button from './common/Button'
import IndeedLogo from './common/IndeedLogo'
import Input from './common/Input'

const SignupPage = () => {

    let [emailId, setEmailId] = useState();
    let [password, setPassword] = useState();
    let [role, setRole] = useState();
    let [isEmployer, setIsEmployer] = useState(false)
    let [isJobSeeker, setIsJobSeeker] = useState(false)

    // const authenticate = () => {
    //     console.log("Email to check ", emailId)
    //     console.log("Password to check ", password)

    //     if (emailId === 'user' && password === 'pass')
    //         history.push('/')
    // }

    const handleEmailIdChange = (e) => {
        console.log(e.target.value)
        setEmailId(e.target.value)
    }

    const handlePasswordChange = (e) => {
        console.log(e.target.value)
        setPassword(e.target.value)
    }

    const createAccountHandler = (e) => {
        console.log("Creating...")
        console.log("E", isEmployer)
        console.log("J", isJobSeeker)

    }

    const handleEmployerSelect = async (e) => {
        setIsEmployer(true);
        setIsJobSeeker(false);

        // console.log(e.target.checked)

        console.log("E", isEmployer)
        console.log("J", isJobSeeker)
        // return e.target.checked;
    }
    const handleJobSeekerSelect = async (e) => {
        setIsJobSeeker(true);
        setIsEmployer(false);


        console.log("E", isEmployer)
        console.log("J", isJobSeeker)

    }
    return (
        <div className="sign-in-page-wrapper">
            <div>
                <IndeedLogo
                    style={{
                        padding: "30px"
                    }} />

            </div>

            <div className="sign-in-box-wrapper">
                <h4><b>Create an Account (it's free) </b> </h4>
                <p>By creating an account, you agree to Indeed's Terms of Service,
                    Cookie Policy and Privacy Policy. You consent to receiving marketing messages from Indeed and may opt out from receiving such messages by following the unsubscribe
                    link in our messages, or as detailed in our terms.</p>
                <Input
                    label="Email Address"
                    required
                    style={{
                        width: "100%",
                        border: "1px solid #696969",
                        marginBottom: "20px",
                        color: "black"
                    }}
                    onChange={handleEmailIdChange}
                    type="email"

                />
                <Input
                    label="Password"
                    required="true"
                    style={{
                        width: "100%",
                        border: "1px solid #696969",
                        marginBottom: "20px",
                        color: "black"
                    }}
                    onChange={handlePasswordChange}
                    type="password"

                />
                <p>

                </p>
                <div className="role-selection-wrapper">
                    <p style={{ color: "black" }}><b>Your role</b> <span className="required">*</span> </p>
                    <p>Let us know how you'll be using our products</p>
                    <div class="form-check">
                        <input class="form-inp" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={handleEmployerSelect} />
                        <label class="form-check-label" for="flexRadioDefault1">
                            Employer
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-inp" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={handleJobSeekerSelect} />
                        <label class="form-check-label" for="flexRadioDefault2">
                            Job Seeker
                        </label>
                    </div>


                </div>
                <Button
                    text="Create Account"
                    onClick={createAccountHandler}
                    style={{
                        width: "100%"
                    }}
                />


            </div>
            <div style={{ marginTop: "20px", color: "#2557a7" }}>
                <NavLink to="JobSeekerSignIn">Have an account? Sign in </NavLink>
            </div>
        </div >
    )
}

export default SignupPage
