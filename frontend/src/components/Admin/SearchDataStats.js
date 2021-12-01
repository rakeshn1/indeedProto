import React, { useState } from 'react'
import Chart from './Chart'

const SearchDataStats = () => {
    const [reviewsData, setReviewsData] = useState([{
        name: "User 1", company: "Company1", reviewSummary: "some review summary",
        review: "jkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajsc"
        , status: 1
    },
    {
        name: "User 1", company: "Company1", reviewSummary: "some review summary",
        review: "jkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajsc"
        , status: 3
    }])

    const jobRelatedData = () => {

    }
    return (

        <div>
            <div>
                {
                    reviewsData?.map(item => {

                        // if (item.status === 3) {

                        return (<div class={item.status === 3 ? "card border-danger mb-3" : "card border-success mb-3"} style={{ maxWidth: "40%" }}>
                            <div class="card-header"><b>Review Summary: </b>  {item.reviewSummary}</div>

                            <div class={item.status === 3 ? "card-body text-danger" : "card-body text-success"}>
                                <h5 class="card-title">Danger card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div >)
                        // }
                        // else {
                        //     return (<div class="card border-success mb-3" style={{ maxWidth: "40%" }}>
                        //         <div class="card-header"><b>Review Summary: </b>  {item.reviewSummary}</div>
                        //         <div className="card-body text-success overflow-auto" style={{ padding: "5px", wordWrap: "break-word", height: "200px" }} >
                        //             {/* <h5 class="card-title"><b>Review Summary: </b>  {item.reviewSummary}</h5> */}
                        //             <p style={{ wordWrap: "break-word" }} class="card-text">{item.review}</p>
                        //         </div>
                        //     </div>)
                        // }
                    }
                    )}
            </div >
            <div>
                <Chart
                    type="Doughnut"
                    color={["green", "red"]}
                />
            </div>
        </div>

    )
}

export default SearchDataStats
