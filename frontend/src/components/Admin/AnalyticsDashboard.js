import React, { useEffect, useState } from "react";
import {
  getNumberOfReviewsPerDay,
  getTopfiveReviewedCompanies,
  getViewCount,
  topFiveCompaniesBasedOnAverageRating,
  topfiveJobSeekersBasedOnAcceptedReviews,
  topTenCeosApproved,
} from "../../services/admin";
import Chart from "./Chart";

const AnalyticsDashboard = () => {
  const [view, setView] = useState();
  const [chartData, setChartData] = useState([]);

  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

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
  };

  useEffect(() => {
    // console.log("here");
    reviewsPerDay();
    topFiveMostReviewedCompanies();
    topFiveJobSeekersAcceptedReviews();
    topFiveCompaniesAverageRating();
    topTenCEOs();
    topTenCompaniesViewsPerDay();
  }, []);

  const reviewsPerDay = async () => {
    const response = await getNumberOfReviewsPerDay();
    console.log("views per day data", response.data);
    // setChartData(response.data)
    let labels_list = [];
    let data_list = [];
    response.data.map((i) => {
      labels_list.push(i._id);
      data_list.push(i.count);
    });

    setLabels1(labels_list);
    // console.log("LL", labels1)
    setData1(data_list);
  };

  const topFiveMostReviewedCompanies = async () => {
    const response = await getTopfiveReviewedCompanies();
    console.log("top Five Reviewed Companies", response.data);
    // setChartData(response.data)

    let labels_list = [];
    let data_list = [];
    response.data.map((i) => {
      labels_list.push(i.name);
      data_list.push(i.count);
    });

    setLabels2(labels_list);
    setData2(data_list);
  };

  const topFiveJobSeekersAcceptedReviews = async () => {
    const response = await topfiveJobSeekersBasedOnAcceptedReviews();
    console.log(
      " top five JobSeekers Based On Accepted Reviews",
      response.data
    );
    // setChartData(response.data)
    let labels_list = [];
    let data_list = [];
    response.data.map((i) => {
      labels_list.push(i.email);
      data_list.push(i.count);
    });

    setLabels3(labels_list);
    setData3(data_list);
  };

  const topFiveCompaniesAverageRating = async () => {
    const response = await topFiveCompaniesBasedOnAverageRating();
    console.log(" top Five Companies Based On Average Rating", response.data);
    let labels_list = [];
    let data_list = [];
    response.data.map((i) => {
      labels_list.push(i.name);
      data_list.push(i.avgRating);
    });

    setLabels4(labels_list);
    setData4(data_list);
  };

  const topTenCEOs = async () => {
    const response = await topTenCeosApproved();
    console.log("top Ten Ceos Approved", response.data);
    let labels_list = [];
    let data_list = [];
    response.data.map((i) => {
      labels_list.push(i.ceo);
      data_list.push(i.approval);
    });

    setLabels5(labels_list);
    setData5(data_list);
  };

  const topTenCompaniesViewsPerDay = async () => {
    const response = await getViewCount();
    console.log("top Ten Companies Based On Views Per Day", response.data);
    // setChartData(response.data);

    let labels_list = [];
    let data_list = [];
    response.data.map((i) => {
      labels_list.push(i.name);
      data_list.push(i.totalCount);
    });

    setLabels6(labels_list);
    setData6(data_list);
  };

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
        <div style={{ margin: "20px auto", display: "flex", justifyContent: "space-between" }}>

          <div className="graph-detail-display">
            <h5>Number of reviews per day</h5>
            <hr />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>

                {
                  labels1.map(i => {
                    return (<pre>Date: {i}  </pre>)
                  })

                }
              </div>
              <div>
                {data1.map((i) => {
                  return <pre>Review Count:{i}</pre>;
                })}
              </div>
            </div>
          </div>
          <div className="graph-disp">
            {data1 && labels1 && (
              <Chart
                labels={labels1}
                data={data1}
                type="Bar"
                labelValue="The number of reviews per day."
                xlabel="Date"
                ylabel="Number of Reviews"
              />
            )}
          </div>
        </div>

        <div style={{ margin: "20px auto", display: "flex", justifyContent: "space-between" }}>
          <div className="graph-detail-display">
            <h5>Top 5 most reviewed companies</h5>
            <hr />
            <div style={{ display: "flex" }}>
              <div>

                {
                  labels2.map(i => {
                    return (<pre>companyName: {i}  </pre>)
                  })

                }
              </div>
              <div>

                {
                  data2.map(i => {
                    return (<pre>Reviews: {i}</pre>)
                  })

                }

              </div>
            </div>
          </div>
          <div className="graph-disp">
            {data2 && labels2 && (
              <Chart
                labels={labels2}
                data={data2}
                type="Bar"
                labelValue="Top 5 most reviewed companies"
              />
            )}
          </div>
        </div>
        <div style={{ margin: "20px auto", display: "flex", justifyContent: "space-between" }}>
          <div className="graph-detail-display">
            <h5> Top 5 job seekers based on total accepted reviews made</h5>
            <hr />
            <div style={{ display: "flex" }}>
              <div>

                {
                  labels3.map(i => {
                    return (<pre>CompanyName: {i}    </pre>)
                  })

                }
              </div>
              <div>

                {
                  data3.map(i => {
                    return (<pre>Avg. Rating:{i}</pre>)
                  })

                }

              </div>
            </div>
          </div>
          <div className="graph-disp">
            {data3 && labels3 && (
              <Chart
                labels={labels3}
                data={data3}
                type="Bar"
                labelValue="Top 5 companies based on average rating"
              />
            )}
          </div>
        </div>
        <div style={{ margin: "20px auto", display: "flex", justifyContent: "space-between" }}>
          <div className="graph-detail-display">
            <h5>Top 5 companies based on average rating</h5>
            <hr />

            <div style={{ display: "flex" }}>
              <div>

                {
                  labels4.map(i => {
                    return (<pre> Email: {i}    </pre>)
                  })

                }
              </div>
              <div>

                {
                  data4.map(i => {
                    return (<pre>Accepted Reviews:{i}</pre>)
                  })

                }

              </div>
            </div>
          </div>
          <div className="graph-disp">
            {data4 && labels4 && (
              <Chart
                labels={labels4}
                data={data4}
                type="Bar"
                labelValue="Top 5 job seekers based on total accepted reviews made"
              />
            )}
          </div>
        </div>

        <div style={{ margin: "20px auto", display: "flex", justifyContent: "space-between" }}>
          <div className="graph-detail-display">
            <h5>Top 10 CEOs based on rating</h5>
            <hr />

            <div style={{ display: "flex" }}>
              <div>

                {
                  labels5.map(i => {
                    return (<pre>CEO: {i}    </pre>)
                  })

                }
              </div>
              <div>

                {
                  data5.map(i => {
                    return (<pre>Rating:{i}</pre>)
                  })

                }

              </div>
            </div>
          </div>
          <div className="graph-disp">
            {data5 && labels5 && (
              <Chart
                labels={labels5}
                data={data5}
                type="Bar"
                labelValue="Top 10 CEOs based on rating"
              />
            )}
          </div>
        </div>

        <div style={{ margin: "20px auto", display: "flex", justifyContent: "space-between" }}>
          <div className="graph-detail-display">
            <h5>Top 10 companies based on views per day</h5>
            <hr />

            <div style={{ display: "flex" }}>
              <div>

                {
                  labels6.map(i => {
                    return (<pre>Company Name: {i}    </pre>)
                  })

                }
              </div>
              <div>

                {
                  data6.map(i => {
                    return (<pre>Views/Day :{i}</pre>)
                  })

                }

              </div>
            </div>
          </div>
          <div className="graph-disp">
            {data6 && labels6 && (
              <Chart
                labels={labels6}
                data={data6}
                type="Bar"
                labelValue="Top 10 companies based on views per day"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
