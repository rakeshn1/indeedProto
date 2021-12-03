import React, { useState } from "react";
import Chart from "./Chart";
import { useEffect } from "react";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";

const SearchDataStats = ({ reviewsList, jobStats }) => {
  // const [reviewsData, setReviewsData] = useState([{
  //     name: "User 1", company: "Company1", reviewSummary: "some review summary",
  //     review: "jkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajsc"
  //     , status: 1
  // },
  // {
  //     name: "User 1", company: "Company1", reviewSummary: "some review summary",
  //     review: "jkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajscjkjabcacakcjadsajkndakndkanksajckanckajckancajkcnaaajskjnakscnascnacnkajsc"
  //     , status: 3
  // }])

  const [pageSize, setPageSize] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [data, setData] = useState([]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    console.log("ReviewsList: ", reviewsList);
    const orders = paginate(reviewsList, currentPage, pageSize);

    //   return { totalCount: reviewsList.length, data: orders };
    setTotalCount(reviewsList.length);
    setData(orders);
  }, [currentPage]);

  //   const filterData = () => {
  //     console.log("ReviewsList: ", reviewsList);
  //     const orders = paginate(reviewsList, currentPage, pageSize);

  //     //   return { totalCount: reviewsList.length, data: orders };
  //     setTotalCount(reviewsList.length);
  //     setData(orders);
  //   };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ maxWidth: "40%" }}>
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}> Reviews </h1>
        {data?.map((item) => {
          // if (item.status === 3) {

          return (
            <div
              className={
                item.status === 3
                  ? "card border-danger mb-3"
                  : "card border-success mb-3"
              }
              style={{ width: "100%" }}
            >
              <div
                className="card-header"
                // {
                //   item.status === 3
                //     ? "card-header bg-danger mb-3"
                //     : "card-header bg-success mb-3"
                // }

                style={
                  item.status === 3
                    ? { backgroundColor: "#FBD1CD" }
                    : { backgroundColor: "#E2FBCD" }
                }
              >
                <b>Review Summary: </b> {item.reviewSummary}
              </div>

              <div class={item.status === 3 ? "card-body " : "card-body "}>
                {/* <h5 class="card-title">Danger card title</h5> */}
                <p class="card-text">{item.review}</p>
              </div>
            </div>
          );
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
        })}
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        ></Pagination>
      </div>

      <div style={{ width: "60%" }}>
        {/* {jobStats && */}
        <h1 style={{ textAlign: "center" }}> Jobs Statistics </h1>
        <div className="d-flex flex-wrap" style={{ justifyContent: "center" }}>
          {jobStats?.map((job) => {
            // const labels = ["Total", "Hired", "Rejected"]
            // const stats = [job.appliedCount, job.hiredCount, job.rejectedCount]
            console.log("job", job);
            return (
              <Chart
                labels={["In process", "Hired", "Rejected"]}
                type="Doughnut"
                color={["blue", "green", "red"]}
                data={[
                  job.appliedCount - job.hiredCount - job.rejectedCount,
                  job.hiredCount,
                  job.rejectedCount,
                ]}
                labelValue="Software Engineer"
                style={{ width: "250px", height: "250px", margin: "20px" }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchDataStats;
