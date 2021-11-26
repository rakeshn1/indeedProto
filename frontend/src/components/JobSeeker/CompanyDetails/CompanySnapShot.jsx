import React from "react";
import { Link } from "react-router-dom";
import CompanyDetailsCard from "./common/CompanyDetailsCard";
import ReviewCard from "./ReviewCard";

class CompanySnapShot extends React.Component {
  render() {
    return (
      <div className="p-3 mt-5">
        <div>
          <h4 className="mb-3">
            <b>About the company</b>
          </h4>
          <div className="mt-3 d-flex flex-row flex-wrap">
            <CompanyDetailsCard title="CEO" content="Andrew Jassy" />

            <CompanyDetailsCard title=" Founded" content="1994" />

            <CompanyDetailsCard
              title="CompanySize"
              content="more than 10,000"
            />
            <CompanyDetailsCard
              title="Revenue"
              content="more than $ 10B (USD) "
            />
            <CompanyDetailsCard
              title="Industry"
              content="Information Technology"
            />
          </div>
          <p className="mt-3">
            At Amazon, you'll discover challenges that excite you as you develop
            professionally and explore many career paths based on your interests
            and abilities. We reward ambitious, talented individuals with a work
            environment that fosters teamwork and collaboration while
            encouraging innovative ideas and fresh thinking.
          </p>
          <Link to="/companydetails/about" className="link">
            <span style={{ color: "#2557A7" }}>
              <b>Learn more </b>
            </span>
          </Link>
        </div>
        <div className="mt-5">
          <h4 className="mb-3">
            <b> Our Mission</b>
          </h4>
          <p>
            What unites Amazonians across teams and geographies is that we are
            all striving to delight our customers and make their lives easier.
            The scope and scale of our mission drives us to seek diverse
            perspectives, be resourceful, and navigate through ambiguity.
            Inventing and delivering things that were never thought possible
            isn't easy, but we embrace this challenge every day. By working
            together on behalf of our customers, we are building the future one
            innovative product, service, and idea at a time. Are you ready to
            embrace the challenge? Come build the future with us.
          </p>
        </div>
        <div className="mt-5 ">
          <h4 className="mb-3">
            <b>Reviews</b>
          </h4>
          <ReviewCard
            rating={"5.0"}
            role="Software Engineer"
            city="San Francisco"
            state="CA"
            reviewedOn={new Date()}
            pros={"Work environment"}
            cons={
              "Advancement is tough, moving beyond customer care is nearly impossible"
            }
            markedAsHelpful={23}
            markedAsNotHelpful={10}
            showHelpfulness={false}
          />
        </div>
      </div>
    );
  }
}

export default CompanySnapShot;
