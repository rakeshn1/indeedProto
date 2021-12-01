import React, { useState } from 'react'
import { useEffect } from 'react'
import EmployerReport from "../common/EmployerReport";
const EmployerReports = () => {
    var [analyticsData, setAnalyticsData] = useState([])
    useEffect(() => {
        // axios.get("http://localhost:3900/employer/api/getCompanyJobs/619d46a4c6f3fa96b4f6cb5e", {
        // }).then(response => {
        //     console.log(response)
        //     if (response.status != 200) {
        //         alert({ html: response.statusText, classes: "#c62828 red darken-3" })
        //     }
        //     else {
        //         setAnalyticsData(response.data)
        //     }
        // })
        var data = [{
            label: "Accepted 11",
            value: 11
        },
        {
            label: "Rejected 4",
            value: 4
        },
        {
            label: "Submitted 11",
            value: 11
        },
        {
            label: "Reviewed 11",
            value: 11
        },
        {
            label: "InitialScreening 11",
            value: 11
        },
        {
            label: "Hired 11",
            value: 11
        }]
        // data.Accepted = 10
        // data.Rejected = 12
        // data.Submitted = 11
        // data.Reviewed = 7
        // data.InitialScreening = 2
        // data.Hired = 11
        setAnalyticsData(data)
    }, [analyticsData])

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", margin: "0px 25%" }}>
                <EmployerReport
                    data={analyticsData}
                    width={500}
                    height={1200}
                    innerRadius={0}
                    outerRadius={200}
                />
            </div>
        </div>
    )
}

export default EmployerReports
