import React, { useState } from 'react'
import Button from '../common/Button'
import ReviewCard from './ReviewCard'

const EmployerReviews = () => {
    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", margin: "0px 5%" }}>
                <ReviewCard />
            </div>
        </div>
    )
}

export default EmployerReviews
