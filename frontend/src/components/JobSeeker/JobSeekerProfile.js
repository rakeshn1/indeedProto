import React from 'react'

const JobSeekerProfile = () => {

    let resumeHandlerFlex = null;
    let auth = 1;
    if (auth) {
        resumeHandlerFlex = (<div className="resume-upload">
            <h5><b> Get Started</b></h5>
            <button> Upload a resume</button>
            <p> By continuing, you agree to create a public resume and agree to receiving job opportunities from employers.</p>
        </div>)
    }
    else {
        resumeHandlerFlex = (<div className="resume-upload">
            <h4>Resume File Name</h4>
        </div>)
    }
    return (
        <div className="container">
            <div className="name-display">
                <div className="profile-circle">  AQ </div>
                <div className="profile-name"> Aaron Quadros</div>

            </div>
            <div className="profile-wrapper">

                <div class="profile-flex-box">
                    {resumeHandlerFlex}
                </div>
                <div class="profile-flex-box">
                    <h5><b>Contact Information:</b></h5>
                    <p>Aaron Quadros</p>
                    <p>aaronmq96@gmail.com</p>
                    <p>91021342123</p>
                </div>
                <div class="profile-flex-box">
                    <h5><b>Job Preferences</b></h5>
                    <p>Save specific details like desired pay and schedule that help us match you with better jobs</p>
                </div>
            </div>

        </div>
    )
}

export default JobSeekerProfile
