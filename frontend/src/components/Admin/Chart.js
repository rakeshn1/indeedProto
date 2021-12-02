import React, { useEffect, useState } from "react";
import { Chart as ReactChart, Doughnut, Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Chart = ({ data, labels, color, type, options, labelValue, style }) => {
  // const [labels, setLabels] = useState([])
  const [chartData, setChartData] = useState({
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
      },
    ],
  });

  useEffect(() => {

    console.log("labels received", labels)
    console.log("CHART DETAILS", data);
    const chartDataIn = {
      labels: labels,
      datasets: [
        {

          data: data,
          // backgroundColor: color,
        },
      ],
    };

    setChartData(chartDataIn);
  }, [data]);
  return (
    <div>
      {type === "Bar" && (
        <div style={{ height: "500px", width: "600px", margin: "0px auto" }}>
          <Bar
            data={chartData}

            options={{
              responsive: true,

              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: labelValue
                }
              }
            }}
          />
        </div>
      )}
      {type === "Doughnut" && (
        <div style={style}>
          <Doughnut
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: labelValue,
                },
                legend: {
                  position: "top",
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Chart;
