import React, { useState } from 'react'
import Button from '../common/Button'
import SearchBox from '../common/SearchBox'
import JobSearchResults from './JobSearchResults'

const JobSeekerLandingPage = () => {

    const [whatText, setWhatText] = useState()
    const [whereText, setWhereText] = useState()
    const onWhatChangeHandler = (value) => {
        console.log(value);
        setWhatText(value)

    }
    const onWhereChangeHandler = (value) => {
        console.log(value);
        setWhereText(value)

    }

    const onButtonClickHandler = () => {
        //call to get jobs
        //api call with parameters what text value and where text value
    }


    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", margin: "0px 25%" }}>
                <SearchBox
                    onChange={onWhatChangeHandler}
                    placeholder="Job title, keywords, or company"
                    innerLabel="What"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>}
                    style={{
                        height: "40px",
                        width: "40%"
                    }}
                    value={whatText}
                />
                <SearchBox
                    onChange={onWhereChangeHandler}
                    placeholder="City, state, zip code, or “remote”"
                    innerLabel="Where"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                    </svg>}
                    style={{
                        height: "40px",
                        width: "40%",
                    }}
                    value={whereText}
                />
                <Button
                    text="Find Jobs"
                    onClick={onButtonClickHandler}
                // style={{}}
                />

            </div>
            <JobSearchResults />
        </div>
    )
}

export default JobSeekerLandingPage
