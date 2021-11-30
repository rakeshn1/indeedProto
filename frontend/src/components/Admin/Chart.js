import React, { useEffect, useState } from 'react'
import { Chart as ReactChart, Doughnut, Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const Chart = ({ data, labels, color, type, options }) => {

    // const [labels, setLabels] = useState([])
    const [chartData, setChartData] = useState(
        {
            labels: labels,
            datasets: [
                {
                    label: 'Population',
                    data: data,
                    backgroundColor: color
                }
            ]
        }
    );


    const getLabels = async () => {

    }


    useEffect(() => {
        getLabels()

    })


    return (
        <div style={{ height: "500px", width: "600px", margin: "0px auto" }}>
            {type === "Bar"
                &&
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,

                        maintainAspectRatio: false
                    }}
                />}
            {type === "Doughnut"
                &&
                <Doughnut
                    data={chartData}
                    options={{
                        responsive: true,

                        maintainAspectRatio: false
                    }}
                />}
        </div>
    )
}

export default Chart
