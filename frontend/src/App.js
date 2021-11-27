import { Switch, Route, Redirect, useLocation } from "react-router-dom";
// import { Switch, Route, Link } from "react-router-dom";
import JobSeekerHome from "./components/JobSeeker/JobSeekerHome";
import JobSeekerReviewsPage from "./components/JobSeeker/JobSeekerReviewsPage";
import JobSeekerSalariesPage from "./components/JobSeeker/JobSeekerSalariesPage";
import JobSeekerReviewsSearchPage from "./components/JobSeeker/JobSeekerReviewsSearchPage";
import JobSeekerSalariesSearchPage from "./components/JobSeeker/JobSeekerSalariesSearchPage";
import Dashboard from "./components/Admin/Dashboard";
import JobSeekerLandingPage from "./components/JobSeeker/JobSeekerLandingPage";
import CompanyHome from "./components/JobSeeker/CompanyDetails/CompanyHome";
import AddReview from "./components/JobSeeker/CompanyDetails/AddReview";
import "./App.css";
import TopNavbar from "./components/common/TopNavbar";
import JobSearchResults from "./components/JobSeeker/JobSearchResults";
import JobCard from "./components/JobSeeker/JobCard";
import JobDescriptionCard from "./components/JobSeeker/JobDescriptionCard";
import JobSeekerSignIn from "./components/JobSeekerSignIn";
import JobSeekerProfile from "./components/JobSeeker/JobSeekerProfile";
import SignUpPage from "./components/SignUpPage";

import EmployerTopNavbar from "./components/common/EmployerTopNavBar";
import EmployerReviews from "./components/Employer/EmployerReviews";
import EmployerReports from "./components/Employer/EmployerReports";
import EmployerJobPostings from "./components/Employer/EmployerJobPostings";
import EmployerApplicants from "./components/Employer/EmployerApplicants";
import CompanyDetails from "./components/Employer/CompanyDetails";
import EmployerDetails from "./components/Employer/EmployerDetails";
function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/signIn/email" &&
        location.pathname !== "/signIn/returningUser" &&
        location.pathname !== "/signIn/newUser" &&
        location.pathname !== "/signUp" && <TopNavbar />}

      {/* <TopNavbar /> */}
      <EmployerTopNavbar />
      <Switch>
        <Route
          path="/jobSeeker/reviews/search/:companyNameAndJobTitle/:location"
          component={JobSeekerReviewsSearchPage}
        ></Route>
        <Route
          path="/jobSeeker/salaries/search/:jobTitle/:location"
          component={JobSeekerSalariesSearchPage}
        ></Route>
        <Route exact path="/jobSeeker">
          <JobSeekerHome />
        </Route>
        <Route path="/jobSeekerProfile">
          <JobSeekerProfile />
        </Route>
        <Route exact path="/jobSeeker/reviews">
          <JobSeekerReviewsPage />
        </Route>
        <Route
          path="/jobseeker/salaries"
          component={JobSeekerSalariesPage}
        ></Route>
        <Route path="/companydetails">
          <CompanyHome />
        </Route>
        <Route path="/company/addReview">
          <AddReview />
        </Route>
        <Route exact path="/employer">
          <CompanyDetails />
        </Route>
        <Route exact path="/employer/reviews">
          <EmployerReviews />
        </Route>
        <Route exact path="/employer/jobPostings">
          <EmployerJobPostings />
        </Route>
        <Route exact path="/employer/applicants">
          <EmployerApplicants />
        </Route>
        <Route exact path="/employer/reports">
          <EmployerReports />
        </Route>
        <Route path="/jobSeekerLandingPage">
          <JobSeekerLandingPage />
        </Route>
        <Route path="/admin">
          <Dashboard />
        </Route>
        <Route path="/jobSearchResults">
          <JobSearchResults />
        </Route>

        <Route exact path="/employer/companyDetails">
          <CompanyDetails />
        </Route>
        <Route exact path="/employer/employerDetails">
          <EmployerDetails />
        </Route>

        <Route path="/jobCard">
          <JobCard />
        </Route>

        <Route path="/jobDescriptionCard">
          <JobDescriptionCard />
        </Route>

        <Route path="/signIn/:type">
          <JobSeekerSignIn />
        </Route>

        <Route path="/signUp/">
          <SignUpPage />
        </Route>

        <Redirect from="/" exact to="/jobSeekerLandingPage" />
        <Redirect from="/jobSeeker" exact to="/jobSeekerLandingPage" />
      </Switch>
    </div>
  );
}

export default App;
