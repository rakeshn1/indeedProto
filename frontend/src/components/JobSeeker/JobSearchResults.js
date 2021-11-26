import React, { useState } from 'react'
import JobCard from './JobCard'
import JobDescriptionCard from './JobDescriptionCard'
import _ from "lodash";

const JobSearchResults = (props) => {

    const [cardDetails, setCardDetails] = useState()

    const onCardClick = (cardId) => {
        console.log("card click", cardId)

        const cardDesc = _.find(props.searchResults, { '_id': cardId })

        setCardDetails(cardDesc)
    }

    return (

        <div className="container job-search-wrapper">
            <div className="cards-wrapper"  >
                {props.searchResults?.map(card => {

                    return <JobCard card={card} onClick={onCardClick} />
                })}
            </div>
            <JobDescriptionCard cardDetails={cardDetails} />
        </div>
    )
}

export default JobSearchResults
