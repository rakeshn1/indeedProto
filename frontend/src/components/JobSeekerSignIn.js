import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Button from './common/Button'
import IndeedLogo from './common/IndeedLogo'
import Input from './common/Input'

const JobSeekerSignIn = () => {

    let { type } = useParams();
    let [emailId, setEmailId] = useState();
    let [password, setPassword] = useState();

    const history = useHistory()

    const checkEmail = () => {
        console.log("Email to check ", emailId)

        let auth = 0;
        if (auth)
            history.push('/signIn/returningUser')
        else
            history.push('/signIn/newUser')
    }

    const authenticate = () => {
        console.log("Email to check ", emailId)
        console.log("Password to check ", password)

        if (emailId === 'user' && password === 'pass')
            history.push('/')
    }

    const handleEmailIdChange = (e) => {
        console.log(e.target.value)
        setEmailId(e.target.value)
    }

    const handlePasswordChange = (e) => {
        console.log(e.target.value)
        setPassword(e.target.value)
    }

    let email = (<>
        <div>
            <IndeedLogo
                style={{
                    padding: "30px"
                }} />
        </div>

        <div className="sign-in-box-wrapper">
            <h4><b> Ready to take the next step?</b> </h4>
            <p>Create an account or sign in.</p>
            <Input
                label="Email address"
                required
                style={{
                    width: "100%",
                    border: "1px solid #696969",
                    marginBottom: "20px",
                    color: "black"
                }}
                onChange={handleEmailIdChange}

            />
            <p>
                When you create an account or sign in,
                you agree to Indeed's Terms, Cookie and Privacy policies.
                You consent to receiving marketing messages from Indeed
                and may opt out from receiving such messages by following
                the unsubscribe link in our messages, or as detailed in our
                terms.
            </p>

            <Button
                text="Continue"
                onClick={checkEmail}
                style={{
                    width: "100%"
                }}
            />
        </div>
    </>
    )

    let returningUser = (<>
        <div>
            <IndeedLogo
                style={{
                    padding: "30px"
                }} />

        </div>

        <div className="sign-in-box-wrapper">
            <h4><b> Welcome back</b> </h4>
            <p>Signing in as this </p>
            <Input
                label="Password"
                required
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
                By signing in to your account,
                you agree to Indeed's Terms, Cookie and Privacy policies.
            </p>
            <Button
                text="Sign in"
                onClick={authenticate}
                style={{
                    width: "100%"
                }}
            />

        </div>
    </>
    )

    let newUser = (<>
        <div>
            <IndeedLogo
                style={{
                    padding: "30px"
                }} />

        </div>

        <div className="sign-in-box-wrapper">
            <h4><b>Create your account</b> </h4>
            <p>Signing up as this</p>
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
                When you create an account or sign in,
                you agree to Indeed's Terms, Cookie and Privacy policies.
                You consent to receiving marketing messages from Indeed
                and may opt out from receiving such messages by following
                the unsubscribe link in our messages, or as detailed in our
                terms.
            </p>
            <Button
                text="Create account"
                onClick={authenticate}
                style={{
                    width: "100%"
                }}
            />

        </div>
    </>

    )

    return (
        <div className="sign-in-page-wrapper">
            {type === 'email' && email}
            {type === 'returningUser' && returningUser}
            {type === 'newUser' && newUser}
        </div>
    )
}

export default JobSeekerSignIn
