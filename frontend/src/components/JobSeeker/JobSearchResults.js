import React from 'react'
import JobCard from './JobCard'
import JobDescriptionCard from './JobDescriptionCard'

const JobSearchResults = (props) => {
    return (

        <div className="container job-search-wrapper">
            <JobCard results={props.searchResults} />
            <JobDescriptionCard />
        </div>
    )
}

export default JobSearchResults
