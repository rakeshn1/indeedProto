import React from "react";
import { Switch, Route } from "react-router-dom";
import CompanyHeader from "./CompanyHeader";
import Reviews from "./Reviews";
import CompanySnapShot from "./CompanySnapShot";
import AboutCompany from "./AboutCompany";
import Jobs from "./Jobs";
import "../../../styles/companyStyles.css";
import { getCompanyDetails } from "../../../services/jobSeeker";

class CompanyHome extends React.Component {
  state = {
    companyDetails: undefined,
  };
  componentWillMount = async () => {
    let response = await getCompanyDetails("61a3446cbbaf757f9a105d91");
    console.log(response.data);
    this.setState({ companyDetails: response.data });
  };

  render() {
    return (
      <div>
        <CompanyHeader />
        <div className="content">
          <Switch>
            <Route path="/companydetails/review">
              <Reviews companyDetails={this.state.companyDetails} />
            </Route>
            <Route path="/companydetails/about">
              <AboutCompany companyDetails={this.state.companyDetails} />
            </Route>
            <Route path="/companydetails/jobs">
              <Jobs companyDetails={this.state.companyDetails} />
            </Route>
            <Route path="/">
              <CompanySnapShot companyDetails={this.state.companyDetails} />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default CompanyHome;
