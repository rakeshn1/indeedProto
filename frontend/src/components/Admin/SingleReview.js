import React, { useState } from 'react'



let statusOptions = [
    // { label: "UnApproved", value: 0 },
    { label: "Approve", value: 1 },
    { label: "Feature", value: 2 },
    { label: "Disapprove", value: 3 }
]

const SingleReview = (props) => {
    const { item } = props;
    const [status, setStatus] = useState()


    console.log("Props", props);

    // useEffect(() => {
    //     setStatus(item.orderStatus)
    // }, [item.orderStatus])

    const handleReviewStatusChange = (e) => {
        console.log("status selected:", e.target.value)
        setStatus(e.target.value)
    }

    const handleReviewStatusUpdate = async (e) => {

        // Unapproved: 0, Approved: 1, Featured: 2, Disapproved:3


        console.log("REVIEW ID", item._id)
        console.log("STATUS", status)

        // api call to set the status of review

        // const payload={
        // status:status,
        // }

        // try{
        // const response = await updateReviewStatus(payload) 
        // console.log("updated status:", response.data)
        // }

        // catch(err){
        //     console.log("Error",err)
        // }

    }



    return (
        <div style={{ boxShadow: "2px 2px 15px", margin: "10px" }} >
            <li class="list-group-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <div
                        style={{ cursor: 'pointer' }}
                    // onClick={onNameClick}

                    >
                        <b>Review By: {item.name} </b>
                        <span style={{ border: "1px solid black", backgroundColor: "black", color: "white", padding: "5px", cursor: "pointer", borderRadius: "5px" }}>
                            {/* <i> {item.customer.name}</i> */}
                        </span>
                    </div>
                    <hr />
                    {/* <p><b>OrderID:</b>  {item._id}</p> */}
                    <div style={{
                        backgroundColor: '#eee', padding: '10px', borderRadius: '10px'
                    }}>
                        {
                            // item.orderItems.map((d) => {
                            //     return (
                            //         <div style={{
                            //             width: '500px', display: 'flex', justifyContent: 'space-between',

                            //         }}>
                            //             <p>{d.dishQuantity}</p>
                            //             <p>{d.dishName}</p>
                            //             <p>{d.itemPrice}</p>
                            //         </div>

                            //     )
                            // })
                        }
                    </div>
                    <hr />
                    {/* <p><b>Note :</b> <i> {item.orderNote}</i></p> */}
                    <hr />
                    {/* <p><b>Order Total : <i>$ {item.total}</i></b></p> */}
                </div>


                <div style={{ textAlign: 'center' }}>

                    <p>Change Review Status</p>
                    <select
                        style={{
                            width: '200px', height: '50px', color: 'white',
                            backgroundColor: 'black', fontWeight: '500', outline: 'none', border: 'none'
                        }}
                        onChange={handleReviewStatusChange}
                        value={status || ''}
                    >
                        {statusOptions.map((i) => <option key={i.label} value={i.value}>{i.label}</option>)
                        }
                    </select>
                    <button className="btn btn-primary" onClick={handleReviewStatusUpdate}> Update </button>
                </div>

            </li>
        </div>
    )
}

export default SingleReview
