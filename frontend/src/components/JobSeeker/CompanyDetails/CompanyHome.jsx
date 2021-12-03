import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CompanyHeader from "./CompanyHeader";
import Reviews from "./Reviews";
import CompanySnapShot from "./CompanySnapShot";
import AboutCompany from "./AboutCompany";
import Jobs from "./Jobs";
import CompanySalaries from "./CompanySalaries";
import "../../../styles/companyStyles.css";
import { getCompanyDetails } from "../../../services/jobSeeker";

class CompanyHome extends React.Component {
  state = {
    companyDetails: undefined,
    id: undefined,
  };
  componentWillMount = async () => {
    const id = this.props.match.params.id;
    let response = await getCompanyDetails(id);
    console.log(response.data);

    this.setState({ companyDetails: response.data });
  };

  render() {
    return (
      <div>
        <CompanyHeader companyDetails={this.state.companyDetails} />
        <div className="content">
          <Switch>
            <Route
              path={`/companydetails/${this.state.companyDetails?._id}/review`}
            >
              <Reviews companyDetails={this.state.companyDetails} />
            </Route>
            <Route
              path={`/companydetails/${this.state.companyDetails?._id}/about`}
            >
              <AboutCompany companyDetails={this.state.companyDetails} />
            </Route>
            <Route
              path={`/companydetails/${this.state.companyDetails?._id}/jobs`}
            >
              <Jobs companyDetails={this.state.companyDetails} />
            </Route>
            <Route
              path={`/companydetails/${this.state.companyDetails?._id}/salaries`}
            >
              <CompanySalaries
                companyDetails={this.state.companyDetails}
              />
            </Route>
            <Route
              path={`/companydetails/${this.state.companyDetails?._id}/snapshot`}
            >
              <CompanySnapShot companyDetails={this.state.companyDetails} />
            </Route>
            <Route
              exact
              path={`/companydetails/${this.state.companyDetails?._id}`}
            >
              <Redirect
                to={`/companydetails/${this.state.companyDetails?._id}/snapshot`}
              />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default CompanyHome;
