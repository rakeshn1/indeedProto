import React from 'react'
import JobCard from './JobCard'
import JobDescriptionCard from './JobDescriptionCard'

const JobSearchResults = () => {
    return (

        <div className="container job-search-wrapper">
            <JobCard />
            <JobDescriptionCard />
        </div>
    )
}

export default JobSearchResults
