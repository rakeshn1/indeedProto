import React, { useEffect, useState } from 'react'
import { getAllUnapprovedReviews, updatePhotoStatus, updateReviewStatus } from '../../services/admin'
import SingleReview from './SingleReview'


const AdminDashboard = () => {

    const [reviewsData, setReviewsData] = useState([{
        name: "User 1", company: "Company1", reviewSummary: "some review summary",
        review: "jkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajsc"
    },
    { name: "somehting" }, { name: "new" }])
    const [picturesData, setPicturesData] = useState([{ url: "https://dlcdnrog.asus.com/rog/media/158404796674.jpg" }, { url: "pic" }])
    const [status, setStatus] = useState()

    const [view, setView] = useState("Reviews")



    useEffect(() => {
        fetchReviews();
    }, [])

    const fetchReviews = async () => {
        // api call to get all 0 status reviews

        const reviews = await getAllUnapprovedReviews()
        setReviewsData(reviews.data)
    }

    const fetchPictures = async () => {


        //api call to get all 0 status

        // const reviews= await getAllReviews()
        // setReviewData(reviews.data) 

    }

    const handleReviewFilter = async (e) => {

        console.log("filter selected ", e.target.value)

    }


    const handlePictureFilter = async (e) => {

        console.log("filter selected? ", e.target.value)

    }

    const handleWhatToView = async (e) => {
        console.log("what to view");
        setView(e.target.value);

    }
    const handleReviewStatusChange = (e) => {
        console.log("status selected:", e.target.value)
        setStatus(e.target.value)
    }
    // let dataToDisplay;


    // Unapproved: 0, Approved: 1, Featured: 2, Disapproved:3
    const handleApproveReviewStatus = async (revId) => {

        // Unapproved: 0, Approved: 1, Featured: 2, Disapproved:3

        // api call to set the status of review

        const payload = {
            reviewId: revId,
            status: 1
        }

        try {
            const response = await updateReviewStatus(payload)
            console.log("updated status:", response.data)
        }

        catch (err) {
            console.log("Error", err)
        }
        await fetchReviews();
    }
    const handleDisapproveReviewStatus = async (revId) => {

        // Unapproved: 0, Approved: 1, Featured: 2, Disapproved:3

        // api call to set the status of review

        const payload = {
            reviewId: revId,
            status: 3
        }

        try {
            const response = await updateReviewStatus(payload)
            console.log("updated status:", response.data)
        }

        catch (err) {
            console.log("Error", err)
        }
        await fetchReviews();

    }

    const handleApprovePhotoStatus = async (e) => {
        const payload = {
            photoId: e._id,
            status: 1
        }

        try {
            const response = await updatePhotoStatus(payload)
            console.log("updated status:", response.data)
        }

        catch (err) {
            console.log("Error", err)
        }
    }

    const handleDisapprovePhotoStatus = async (e) => {
        const payload = {
            photoId: e._id,
            status: 2
        }

        try {
            const response = await updatePhotoStatus(payload)
            console.log("updated status:", response.data)
        }

        catch (err) {
            console.log("Error", err)
        }

    }

    return (
        <div>
            <div className="container">

                <h3 style={{ padding: "20px 0px" }}>Review and Pictures</h3>
                <div style={{ display: "flex" }}>

                    <h6 style={{ padding: "10px" }}> Choose what to filter: </h6>

                    <select onChange={handleWhatToView} >Choose what to view:
                        <option value="Reviews">Reviews</option>
                        <option value="Pictures">Pictures</option>
                    </select>
                </div>
            </div>
            <hr />
            <div>
                <ul className="list-group">
                    {
                        view === "Reviews" ?
                            reviewsData?.map(item => {
                                console.log("ITEM", item.name)

                                return (
                                    <div className="container"  >
                                        <li class="list-group-item" style={{ border: "none", display: 'flex', justifyContent: 'space-evenly' }}>
                                            <div style={{ width: "50%" }} >

                                                <p><b>Review Summary: </b>  {item.reviewSummary}</p>
                                                <div
                                                    className="overflow-auto"
                                                    style={{
                                                        border: "1px solid grey", padding: '5px', borderRadius: '5px',
                                                        width: "100%",
                                                        height: "200px",
                                                        wordWrap: "break-word"
                                                    }}>

                                                    {item.review}
                                                </div>
                                            </div>


                                            <div style={{ width: "25%", textAlign: "center", padding: "20px" }} >

                                                <button type="button" style={{ padding: "10px", margin: "10px" }} className="btn btn-success" onClick={() => handleApproveReviewStatus(item._id)}>Approve</button>
                                                <button type="button" style={{ padding: "10px", margin: "10px" }} className="btn btn-danger" onClick={() => handleDisapproveReviewStatus(item._id)}>Disapprove</button>
                                            </div>

                                        </li>
                                    </div>


                                )


                            }) :
                            picturesData?.map(item => {
                                console.log("ITEM", item.data)
                                return (
                                    <div className="container"  >
                                        <li class="list-group-item" style={{ border: "none", display: 'flex', justifyContent: 'space-evenly' }}>
                                            <div style={{ height: "100%", width: "50%" }} >

                                                <img style={{ height: "200px", width: "50%" }} src={item.url} alt="" ></img>

                                            </div>


                                            <div style={{ width: "25%", textAlign: "center", padding: "20px" }} >

                                                <button type="button" style={{ padding: "10px", margin: "10px" }} className="btn btn-success" onClick={handleApprovePhotoStatus}>Approve</button>
                                                <button type="button" style={{ padding: "10px", margin: "10px" }} className="btn btn-danger" onClick={handleDisapprovePhotoStatus}>Disapprove</button>
                                            </div>

                                        </li>
                                    </div>

                                )
                            })
                    }
                </ul>
            </div >
        </div >
    )
}

export default AdminDashboard
