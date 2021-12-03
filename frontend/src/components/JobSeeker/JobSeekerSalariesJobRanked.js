import React, { Component } from "react";
import { Link } from "react-router-dom";

class JobsRankedRow extends React.Component {
  render() {
    let {
      _id,
      logo,
      name,
      rating,
      numberOfReviews,
      numberOfSalaryReviews,
      averageSalary,
    } = this.props;
    if (!logo) {
      logo = "https://www.oiltechconnect.com/front-end/img/default-logo.png";
    }

    if (!rating) {
      rating = 0;
    }

    if (!numberOfReviews) {
      numberOfReviews = 0;
    }
    const filledStars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      filledStars.push(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-star-fill"
          viewBox="0 0 16 16"
        >
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
      );
    }
    const unFilledStars = [];
    for (let i = 0; i < (5 - rating).toFixed(); i++) {
      unFilledStars.push(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-star"
          viewBox="0 0 16 16"
        >
          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
        </svg>
      );
    }

    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            padding: "15px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            <img style={{ height: "50px", width: "50px" }} src={logo}></img>
            <div style={{ marginLeft: "20px" }}>
              <div>
                <Link
                  to={`/companyDetails/${_id}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontSize: "1rem",
                    letterSpacing: "0px",
                    fontWeight: "700",
                    lineHeight: "1.38",
                  }}
                >
                  {name}
                </Link>
              </div>
              <div style={{ display: "flex" }}>
                <Link
                  to={`/companyDetails/${_id}/review`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontSize: "1rem",
                    letterSpacing: "0px",
                    fontWeight: "700",
                    lineHeight: "1.38",
                    width: "30px",
                  }}
                >
                  {rating.toFixed(2)}
                </Link>
                <div style={{ marginLeft: "10px", marginTop: "-3px" }}>
                  {filledStars.map((star) => star)}
                  {unFilledStars.map((star) => star)}
                </div>
                <Link
                  to={`/companyDetails/${_id}/review`}
                  style={{
                    width: "100px",
                    color: "#6f6f6f",
                    marginLeft: "15px",
                    marginRight: "1rem",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    letterSpacing: "0px",
                    fontWeight: "400",
                    marginTop: "auto",
                    marginBottom: "0px",
                  }}
                >
                  {numberOfReviews} reviews
                </Link>
                <Link
                  to={`/companyDetails/${_id}/salaries`}
                  style={{
                    color: "#6f6f6f",
                    paddingLeft: "0.5rem",
                    paddingRight: "1rem",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    letterSpacing: "0px",
                    fontWeight: "400",
                    marginTop: "auto",
                    marginBottom: "0px",
                  }}
                >
                  {numberOfSalaryReviews} salaries reported
                </Link>
              </div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ justifyContent: "end" }}>
              <Link
                style={{ textDecoration: "none" }}
                to={`/companyDetails/${_id}/review`}
              >
                <div
                  style={{
                    color: "black",
                    fontSize: "1.25rem",
                    padding: "1px 0px 2px",
                    fontWeight: "700",
                    textAlign: "right",
                  }}
                >
                  ${averageSalary}
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "0.875rem",
                    letterSpacing: "-.1px",
                    fontWeight: "400",
                    lineHeight: "1.12",
                    textAlign: "right",
                  }}
                >
                  per year
                </div>
              </Link>
            </div>
            <Link
              to={`/companyDetails/${_id}/review`}
              style={{
                marginTop: "auto",
                marginBottom: "auto",
                marginLeft: "20px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="16"
                fill="currentColor"
                class="bi bi-chevron-compact-right"
                viewBox="0 0 16 16"
                color="#065FF7"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"
                />
              </svg>
            </Link>
          </div>
        </div>
        <hr
          style={{
            color: "black",
            backgroundColor: "#9f9f9f",
            height: "1px",
            width: "100%",
            padding: "0px",
            margin: "0px",
          }}
        ></hr>
      </React.Fragment>
    );
  }
}

export default JobsRankedRow;
