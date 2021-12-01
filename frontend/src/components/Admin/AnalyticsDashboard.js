import React, { useEffect, useState } from 'react'
import { getNumberOfReviewsPerDay, getTopfiveReviewedCompanies, topfiveJobSeekersBasedOnAcceptedReviews, topTenCeosApproved } from '../../services/admin';
import Chart from './Chart';

const AnalyticsDashboard = () => {
    const [view, setView] = useState()
    const [chartData, setChartData] = useState([])
    const [labels, setLabels] = useState([])
    const [data, setData] = useState([])


    const [labels1, setLabels1] = useState([]);
    const [data1, setData1] = useState([]);

    const [labels2, setLabels2] = useState([]);
    const [data2, setData2] = useState([]);

    const [labels3, setLabels3] = useState([]);
    const [data3, setData3] = useState([]);

    const [labels4, setLabels4] = useState([]);
    const [data4, setData4] = useState([]);

    const [labels5, setLabels5] = useState([]);
    const [data5, setData5] = useState([]);

    const [labels6, setLabels6] = useState([]);
    const [data6, setData6] = useState([]);



    const handleWhatToView = async (e) => {
        console.log("what to view", e.target.value);
        setView(e.target.value);

    }

    // const renderSwitch = async (option) => {
    //     switch (option) {
    //         case '1':
    //             // let result = await reviewsPerDay();
    //             return (<Chart
    //                 labels={labels}
    //                 data={data}
    //             />);

    //         case '2':
    //             // let result = topFiveMostReviewedCompanies();
    //             return (<Chart
    //                 labels={labels}
    //                 data={data}
    //             />);
    //         case '3':
    //             await topFiveJobSeekersAcceptedReviews();
    //             return (<Chart
    //                 labels={labels}
    //                 data={data}
    //             />);
    //         case '4':
    //             // await topFiveCompaniesAverageRating();
    //             return (<Chart
    //                 labels={labels}
    //                 data={data}
    //             />);
    //         case '5':
    //             await topTenCEOs();
    //             return (<Chart
    //                 labels={labels}
    //                 data={data}
    //             />);
    //         case '6':
    //             await topTenCompaniesViewsPerDay();
    //             return (<Chart />);
    //         default:
    //             return (<div style={{ textAlign: "center" }}> No Selection </div>);
    //     }
    // }


    useEffect(() => {
        console.log("here")
        reviewsPerDay();
        topFiveMostReviewedCompanies();
        topFiveJobSeekersAcceptedReviews();
        // topFiveCompaniesAverageRating();
        topTenCEOs();
        // topTenCompaniesViewsPerDay();

    }, [])

    const reviewsPerDay = async () => {

        const response = await getNumberOfReviewsPerDay();
        console.log("views per day data", response.data)
        // setChartData(response.data)
        let labels_list = []
        let data_list = []
        response.data.map(i => {
            labels_list.push(i._id)
            data_list.push(i.count)
        })

        setLabels1(labels_list);
        setData1(data_list)

    }

    const topFiveMostReviewedCompanies = async () => {

        const response = await getTopfiveReviewedCompanies()
        console.log("top Five Reviewed Companies", response.data)
        // setChartData(response.data)

        let labels_list = []
        let data_list = []
        response.data.map(i => {
            labels_list.push(i.name)
            data_list.push(i.count)
        })

        setLabels2(labels_list);
        setData2(data_list);
    }

    const topFiveJobSeekersAcceptedReviews = async () => {

        const response = await topfiveJobSeekersBasedOnAcceptedReviews()
        console.log(" top five JobSeekers Based On Accepted Reviews", response.data)
        // setChartData(response.data)
        let labels_list = []
        let data_list = []
        response.data.map(i => {
            // console.log(i)
            labels_list.push(i.email)
            data_list.push(i.count)
        })

        setLabels3(labels_list);
        setData3(data_list);
    }

    const topFiveCompaniesAverageRating = async () => {

        // const response = await topFiveCompaniesBasedOnAverageRating()
        // console.log(" top Five Companies Based On Average Rating", response.data)
        // setChartData(response.data)
        let labels_list = []
        let data_list = []
        chartData.map(i => {
            // console.log(i)
            labels_list.push(i.companyName)
            data_list.push(i.rating)
        })

        setLabels4(labels_list);
        setData4(data_list);
    }


    const topTenCEOs = async () => {

        const response = await topTenCeosApproved()
        console.log("top Ten Ceos Approved", response.data)
        // setChartData(response.data)
        let labels_list = []
        let data_list = []
        response.data.map(i => {
            labels_list.push(i.ceo)
            data_list.push(i.approval)
        })

        setLabels5(labels_list);
        setData5(data_list)
    }

    const topTenCompaniesViewsPerDay = async () => {

        // const response = await topTenCompaniesBasedOnViewsPerDay()
        // console.log("top Ten Companies Based On Views Per Day", response.data)
        // setChartData(response.data)

        let labels_list = []
        let data_list = []
        chartData.map(i => {
            labels_list.push(i.companyName)
            data_list.push(i.views)
        })

        setLabels6(labels_list);
        setData6(data_list)
    }

    return (
        <div>
            <div className="container">

                <h3 style={{ padding: "20px 0px" }}>Analytics Dashboard</h3>
                {/* <div style={{ display: "flex" }}>

                    <h6 style={{ padding: "10px" }}> Selec an option from the dropdown to view</h6>

                    <select onChange={handleWhatToView} >
                        <option value="">Select</option>
                        <option value="1">The number of reviews per day.</option>
                        <option value="2">Top 5 most reviewed companies.</option>
                        <option value="3">Top 5 companies based on average rating.</option>
                        <option value="4">Top 5 job seekers based on total accepted reviews made.</option>
                        <option value="5">Top 10 CEOs based on rating.</option>
                        <option value="6">Top 10 companies based on views per day.
                        </option>
                    </select>
                </div> */}
                <div style={{ margin: "20px auto" }}>
                    {data1 && labels1 && (<Chart
                        labels={labels1}
                        data={data1}
                        type="Bar"
                        color={["blue", "red", "orange", "yellow", "green"]}
                    />)
                    }
                </div>
                <div style={{ margin: "20px auto" }}>
                    <Chart
                        labels={labels2}
                        data={data2}
                        type="Bar"
                        color={["blue", "red", "orange", "yellow", "green"]}
                    />
                </div>
                <div style={{ margin: "20px auto" }}>
                    <Chart
                        labels={labels3}
                        data={data3}
                        type="Bar"
                        color={["blue", "red", "orange", "yellow", "green"]}

                    />
                </div><div style={{ margin: "20px auto" }}>
                    <Chart
                        labels={labels4}
                        data={data4}
                        type="Bar"
                        color={["blue", "red", "orange", "yellow", "green"]}

                    />
                </div><div style={{ margin: "20px auto" }}>
                    <Chart
                        labels={labels5}
                        data={data5}
                        type="Bar"
                        color={["blue", "red", "orange", "yellow", "green", "lightblue", "grey", "purple", "brown", "silver"]}
                    />
                </div><div style={{ margin: "20px auto" }}>
                    <Chart
                        labels={labels6}
                        data={data6}
                        type="Bar"
                        color={["blue", "red", "orange", "yellow", "green", "lightblue", "grey", "purple", "brown", "silver"]}
                    />
                </div>

            </div>
        </div >
    )
}

export default AnalyticsDashboard
