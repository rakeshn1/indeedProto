import React from 'react'
import { NavLink } from 'react-router-dom'
import JobSeekerAppliedJobs from './JobSeekerAppliedJobs'
import JobSeekerSavedJobs from './JobSeekerSavedJobs'

const JobSeekerMyJobs = () => {
    return (
        <div className="container">
            <div className="heading-my-jobs">

                My jobs
            </div>

            <div className="nav-left-tabs" style={{ marginTop: "55x", display: "flex", borderBottom: "1px solid silver" }}>

                <NavLink exact={true} activeClassName='active' to="/jobSeeker/myJobs/savedJobs" className="navbar-buttons" style={{ width: "100px", display: "flex", fontSize: "16px" }} >Saved
                    <div className="count-holder"> 20</div></NavLink>

                <NavLink activeClassName='active' style={{ width: "100px", display: "flex", fontSize: "16px" }} to="/jobSeeker/myJobs/appliedJobs" className="navbar-buttons">Applied <div className="count-holder">19</div> </NavLink>
            </div>

            <JobSeekerSavedJobs />
            <JobSeekerAppliedJobs />

        </div >
    )
}

export default JobSeekerMyJobs
