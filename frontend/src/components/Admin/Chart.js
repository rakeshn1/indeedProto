import React, { useEffect, useState } from "react";
import { Chart as ReactChart, Doughnut, Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Chart = ({ data, labels, color, type, options, labelValue, style }) => {
  // const [labels, setLabels] = useState([])
  const [chartData, setChartData] = useState({
    labels: labels,
    datasets: [
      {
        // label: "DO",
        data: data,
        backgroundColor: color,
      },
    ],
  });

  useEffect(() => {
    console.log("CHART DETAILS", data);
    const chartDataIn = {
      labels: labels,
      datasets: [
        {
          //   label: "Do",
          data: data,
          backgroundColor: color,
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
