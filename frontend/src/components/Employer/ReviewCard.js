import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { getCurrentUser, getJwt } from "../../services/auth";
const ReviewCard = () => {
    var [reviews, setReviews] = useState([])
    var [refresh, setRefresh] = useState([false])
    const user = getCurrentUser();
    const toggleIsFeatured = (reviewId, status) => {
        console.log(reviewId, status)
        if (status == 1) {
            status = 2
        }
        else if (status == 2) {
            status = 1
        }
        axios.put(`http://localhost:3900/employer/api/updateCompanyReviews/${reviewId}`, { status }, {
        }).then(response => {
            if (response.status != 200) {
                alert({ html: response.statusText, classes: "#c62828 red darken-3" })
            }
            else {
                console.log(reviews)
                setReviews(reviews)
                setRefresh([!refresh])
            }
        })
    }


    useEffect(() => {
        axios.get(`http://localhost:3900/employer/api/getCompanyReviews/${user.companyId}`, {
        }).then(response => {
            console.log(response)
            if (response.status != 200) {
                alert({ html: response.statusText, classes: "#c62828 red darken-3" })
            }
            else {
                console.log(response.data)
                setReviews(response.data)
            }
        })
    }, [refresh])


    return (
        <div className="reviews-wrapper" >
            {
                reviews.map((review, index) => {
                    return (
                        <div className="review-card-wrapper">
                            <div className="job-title">
                                <div><span>{review.firstName + " " + review.lastName + "(" + review.jobTitle + "-" + review.jobLocation + ")"}</span></div>
                                <span onClick={() => { toggleIsFeatured(review._id, review.status) }}>
                                    {review.status == 1 ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                            <path d="M12.38,2.25A4.49,4.49,0,0,0,9,3.82,4.49,4.49,0,0,0,5.63,2.25,4.08,4.08,0,0,0,1.5,6.38c0,2.83,2.55,5.15,6.41,8.66L9,16l1.09-1C14,11.52,16.5,9.21,16.5,6.38A4.08,4.08,0,0,0,12.38,2.25ZM9.08,13.91L9,14l-0.08-.08C5.35,10.68,3,8.54,3,6.38A2.56,2.56,0,0,1,5.63,3.75,2.93,2.93,0,0,1,8.3,5.52H9.7a2.91,2.91,0,0,1,2.67-1.77A2.56,2.56,0,0,1,15,6.38C15,8.54,12.65,10.68,9.08,13.91Z" />
                                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" fill="red" class="bi bi-heart" viewBox="0 0 16 16">
                                            <path fill="red" d="M12.38,2.25A4.49,4.49,0,0,0,9,3.82,4.49,4.49,0,0,0,5.63,2.25,4.08,4.08,0,0,0,1.5,6.38c0,2.83,2.55,5.15,6.41,8.66L9,16l1.09-1C14,11.52,16.5,9.21,16.5,6.38A4.08,4.08,0,0,0,12.38,2.25ZM9.08,13.91L9,14l-0.08-.08C5.35,10.68,3,8.54,3,6.38A2.56,2.56,0,0,1,5.63,3.75,2.93,2.93,0,0,1,8.3,5.52H9.7a2.91,2.91,0,0,1,2.67-1.77A2.56,2.56,0,0,1,15,6.38C15,8.54,12.65,10.68,9.08,13.91Z" />
                                        </svg>}
                                </span>
                            </div>
                            <div className="job-card-company-details">
                                <span>Rating: <b> {review.rating} </b> <svg width='18' height='18' fill='currentColor' viewBox="5 0 18 22"
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M8.805 4.134a.206.206 0 01.385 0l1.312 3.203 3.307.317c.184.018.258.257.12.385l-2.498 2.298.732 3.394c.04.188-.154.336-.312.238l-2.854-1.777-2.853 1.776c-.158.099-.352-.05-.311-.238l.736-3.393-2.497-2.298c-.139-.128-.065-.367.119-.385l3.307-.317 1.307-3.203z' />
                                </svg>
                                </span>
                            </div>
                            <div style={{maxHeight:"80px", overflow:"scroll"}}>
                                <p>
                                    <span style={{ fontSize: '12px' }}>
                                        {review.review}
                                    </span>

                                </p>
                            </div>
                            <div className="job-card-salary">
                                <span>{review.reviewSummary}</span>

                            </div>

                            <div className="job-card-role-summary">
                                <ul>

                                    <li>
                                        Pros: {review.pros}
                                    </li>
                                    <li>
                                        Cons:{review.cons}
                                    </li>

                                </ul>


                            </div>

                            <div className="job-card-posted-ago">

                            </div>
                        </div >)
                })
            }
        </div>
    )
}

export default ReviewCard
