import React from "react";
import { Switch, Route } from "react-router-dom";
import CompanyHeader from "./CompanyHeader";
import Reviews from "./Reviews";
import CompanySnapShot from "./CompanySnapShot";
import AboutCompany from "./AboutCompany";
import "../../../styles/companyStyles.css";

class CompanyHome extends React.Component {
  render() {
    return (
      <div>
        <CompanyHeader />
        <div className="content">
          <Switch>
            <Route path="/companydetails/review">
              <Reviews />
            </Route>
            <Route path="/companydetails/about">
              <AboutCompany />
            </Route>
            <Route path="/">
              <CompanySnapShot />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default CompanyHome;
