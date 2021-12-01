import React, { useEffect, useState } from 'react'
import JobCard from './JobCard'
import JobDescriptionCard from './JobDescriptionCard'
import _ from "lodash";

const JobSearchResults = (props) => {

    const [cardDetails, setCardDetails] = useState()

    const onCardClick = async (cardId) => {
        console.log("card click", cardId)

        const cardDesc = _.find(props.searchResults, { '_id': cardId })

        setCardDetails(cardDesc)
    }

    const setFirst = async () => {
        console.log("here")
        if (props.searchResults && !cardDetails)
            setCardDetails(props.searchResults[0]);
    }

    useEffect(() => {
        setFirst();
    })

    let card = null
    if (cardDetails)
        card = (<JobDescriptionCard cardDetails={cardDetails} />)
    // else
    //     setCardDetails(props.searchResults)

    console.log("SearchResults: ", props.searchResults)
    return (

        <div className="container job-search-wrapper" >
            <div className="cards-wrapper" >
                {props.searchResults?.map(card => {
                    return <JobCard card={card} onClick={onCardClick} />
                })}
            </div>
            {props.searchResults.length > 0 && card}
        </div>
    )
}

export default JobSearchResults
