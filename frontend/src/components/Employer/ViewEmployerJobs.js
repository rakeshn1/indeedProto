import React, { useState } from 'react'
import JobCard from './JobCard'

const ViewEmployerJobs = () => {
    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", margin: "0px 5%" }}>
                <JobCard />
            </div>
        </div>
    )
}

export default ViewEmployerJobs
