import React from 'react'
import { handleJobSaveUnsave } from '../../services/jobSeeker'
import Button from '../common/Button'

const JobSeekerSavedJobs = () => {

    const handleApplyNow = () => {
        console.log("Applied")
        const payload = {
            // jobId,
            userId: "619f12eb7a93a10478dcae74"
        }
        handleJobSaveUnsave(payload)
    }

    const handleRemoveSavedJob = () => {
        // console.log("JobId", jobId)
        const payload = {
            // jobId,
            userId: "619f12eb7a93a10478dcae74"
        }
        handleJobSaveUnsave(payload)
    }

    return (
        <div className="container">
            <div className="my-jobs-card">
                <div className="my-jobs-card-left">
                    <div className="profile-circle" style={{ backgroundColor: "beige", border: "none" }}><img src="#" alt=""></img> </div>
                    <div className="my-jobs-card-details">
                        <div> <b> Product Designer </b></div>
                        <div>Moxtra</div>
                        <div>Cupertino, CA</div>
                        <div>Saved on Nov 18</div>

                    </div>
                </div>

                <div className="my-jobs-card-right">
                    <Button
                        text="Apply now"
                        style={{
                            width: "200px"
                        }}

                        onClick={handleApplyNow}
                    />
                    <div onClick={handleRemoveSavedJob}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                            <path d="m15.536 7.8987c-0.1953-0.19526-0.5119-0.19526-0.7071 0l-2.8284 2.8284-2.8285-2.8284c-0.19526-0.19527-0.51185-0.19527-0.70711 0l-0.56568 0.56568c-0.19527 0.19526-0.19526 0.51185 0 0.70711l2.8285 2.8284-2.8285 2.8285c-0.19526 0.1952-0.19526 0.5118 0 0.7071l0.56568 0.5657c0.19527 0.1952 0.51185 0.1952 0.70711 0l2.8285-2.8285 2.8284 2.8284c0.1952 0.1953 0.5118 0.1953 0.7071 0l0.5657-0.5657c0.1952-0.1953 0.1952-0.5118 0-0.7071l-2.8284-2.8284 2.8283-2.8284c0.1953-0.19526 0.1953-0.51184 0-0.70711l-0.5656-0.56568z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default JobSeekerSavedJobs
