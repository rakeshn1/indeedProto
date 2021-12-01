import React, { useState } from 'react'
import JobApplicantCard from './JobApplicantCard'

const EmployerApplicants = () => {
    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", margin: "0px 5%" }}>
                <JobApplicantCard />
            </div>
        </div>
    )
}

export default EmployerApplicants
