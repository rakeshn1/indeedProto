import React, { useEffect, useState } from 'react'

const JobSeekerMyReviews = () => {
    const [reviewsData, setReviewsData] = useState()


    const fetchMyReviews = () => {

    }

    useEffect(() => {
        fetchMyReviews();
    })
    return (
        <div className="container">
            <div className="heading-my-jobs">
                My reviews and contributions
            </div>
            {
                reviewsData ?
                    reviewsData.map(review => {
                        return (
                            <div>
                                <h3>Company Name</h3>
                                <p>
                                    review
                                </p>
                            </div>
                        )
                    }

                    ) :
                    (
                        <div style={{ textAlign: "center", paddingTop: "50px" }} >
                            <img style={{ height: "160px", width: "200px" }} src="https://www.indeed.com/contributions/static/images/ZRPImage-2e30cc.png" alt="#"></img>
                            <p>No company reviews</p>
                        </div>
                    )
            }
        </div >
    )
}

export default JobSeekerMyReviews
