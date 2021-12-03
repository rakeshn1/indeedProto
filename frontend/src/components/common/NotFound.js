import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotFound extends React.Component {
  render() {
    const image = "https://www.indeed.com/images/404_New_1.png";
    return (
      <div
        className="container"
        style={{
          //   backgroundImage: "https://www.indeed.com/images/404_New_1.png",
          height: "100%",
          width: "100%",
          textAlign: "center",
          paddingTop: "100px",
        }}
      >
        <img src={image}></img>
        <h1
          //   className="text-muted"
          style={{
            textAlign: "center",
            paddingTop: "10px",
            fontWeight: "bold",
            fontSize: "24px",
            lineHeight: "125%",
          }}
        >
          We can’t find this page
        </h1>
        <div
          style={{
            width: "442px",
            margin: "0px auto",
          }}
        >
          <p
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: "16px",
              lineHeight: "150%",
            }}
          >
            It looks like this page doesn't exist or isn’t available right now.
            Check the URL for any typos or choose an option below.
          </p>
        </div>
        <Link
          className="btn"
          style={{
            backgroundColor: "#2557a7",
            color: "white",
            fontWeight: "700",
          }}
          to="/"
        >
          Go Home
        </Link>
      </div>
    );
  }
}

export default NotFound;
