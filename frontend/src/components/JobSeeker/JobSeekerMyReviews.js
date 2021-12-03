import React, { useEffect, useState } from "react";
import { getJobSeekerReviews } from "../../services/jobSeeker";
import { getCurrentUser } from "../../services/auth";
import { ReviewCard } from "./CompanyDetails/ReviewCard";
import { Link } from "react-router-dom";

const JobSeekerMyReviews = () => {
  const [reviewsData, setReviewsData] = useState();

  const fetchMyReviews = async () => {
    const user = getCurrentUser();
    const { data } = await getJobSeekerReviews(user._id);
    setReviewsData(data);
  };

  useEffect(() => {
    fetchMyReviews();
  }, []);

  return (
    <div className="container" style={{ width: "50%" }}>
      <div
        className="heading-my-jobs"
        style={{ marginLeft: "10px", marginBottom: "20px" }}
      >
        My reviews and contributions
      </div>
      {reviewsData?.length > 0 ? (
        reviewsData.map((review) => {
          return (
            <div className="card" style={{ margin: "10px" }}>
              <div className="d-flex flex-row justify-start p-3">
                <h4
                  style={{
                    fontSize: "1.5rem",
                    color: "#2d2d2d",
                    fontWeight: "700",
                    paddingTop: "1px",
                    textAlign: "center",
                  }}
                >
                  {review.rating}
                </h4>
                <div className="d-flex flex-column ps-4">
                  <Link
                    style={{
                      fontSize: "1.25rem",
                      lineHeight: "1.5",
                      textDecoration: "none",
                      fontWeight: "700",
                      color: "black",
                      letterSpacing: "-0.1px",
                    }}
                    to={`/companyDetails/${review.companyId}/review`}
                  >
                    {review.reviewSummary}
                  </Link>
                  <span style={{ fontSize: ".75rem", color: "#767676" }}>
                    {review.jobTitle} (Former Employee )
                  </span>
                  <span
                    style={{ fontSize: "0.875rem", color: "##595959" }}
                    className="pt-3"
                  >
                    {review.review}
                  </span>
                  <span
                    style={{ fontSize: "0.875rem", fontWeight: 700 }}
                    className="pt-2"
                  >
                    <i
                      class="fa fa-check"
                      aria-hidden="true"
                      style={{ color: "green", paddingRight: "5px" }}
                    ></i>
                    Pros
                  </span>
                  <span
                    style={{ fontSize: "0.875rem", color: "##595959" }}
                    className="pb-1"
                  >
                    {review.pros}
                  </span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 700 }}>
                    <i
                      class="fa fa-times"
                      aria-hidden="true"
                      style={{ color: "red", paddingRight: "5px" }}
                    ></i>
                    Cons
                  </span>
                  <span
                    style={{ fontSize: "0.875rem", color: "##595959" }}
                    className="pb-1"
                  >
                    {review.cons}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div style={{ textAlign: "center", paddingTop: "50px" }}>
          <img
            style={{ height: "160px", width: "200px" }}
            src="https://www.indeed.com/contributions/static/images/ZRPImage-2e30cc.png"
            alt="#"
          ></img>
          <p>No company reviews</p>
        </div>
      )}
    </div>
  );
};

export default JobSeekerMyReviews;
