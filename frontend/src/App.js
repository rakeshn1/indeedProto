import { Switch, Route, Redirect, useLocation } from "react-router-dom";
// import { Switch, Route, Link } from "react-router-dom";
import AdminRoute from "./components/common/adminRoute";
import EmployeerRoute from "./components/common/employeeRoute";
import JobSeekerRoute from "./components/common/jobSeekerRoute";
import BaseRoute from "./components/common/baseRoute";
import { getCurrentUser, getJwt } from "./services/auth";

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
import SignInPage from "./components/SignInPage";

import EmployerTopNavbar from "./components/common/EmployerTopNavBar";

import EmployerReviews from "./components/Employer/EmployerReviews";
import EmployerReports from "./components/Employer/EmployerReports";
import EmployerJobPostings from "./components/Employer/EmployerJobPostings";
import EmployerApplicants from "./components/Employer/EmployerApplicants";
import CompanyDetails from "./components/Employer/CompanyDetails";
import EmployerDetails from "./components/Employer/EmployerDetails";
import JobSeekerMyJobs from "./components/JobSeeker/JobSeekerMyJobs";
import JobSeekerSavedJobs from "./components/JobSeeker/JobSeekerSavedJobs";
import JobSeekerAppliedJobs from "./components/JobSeeker/JobSeekerAppliedJobs";
import JobSeekerMyReviews from "./components/JobSeeker/JobSeekerMyReviews";
import Logout from "./components/logout";
import AdminDashboard from "./components/Admin/AdminDashboard";
import CompanyProfilePage from "./components/Admin/CompanyProfilePage";
import AnalyticsDashboard from "./components/Admin/AnalyticsDashboard";

function App() {
  const location = useLocation();
  const jwt = getJwt();
  const user = getCurrentUser();
  console.log("In app.js: USER: ", user, " --- JWT: ", jwt);

  return (
    <div className="App">
      {/* {location.pathname !== "/signIn/email" &&
        location.pathname !== "/signIn/returningUser" &&
        location.pathname !== "/signIn/newUser" &&
        location.pathname !== "/signUp" && <TopNavbar />} */}

      {location.pathname !== "/login" &&
        location.pathname !== "/signIn/email" &&
        location.pathname !== "/signIn/returningUser" &&
        location.pathname !== "/signIn/newUser" &&
        location.pathname !== "/signUp" && <TopNavbar />}

      {/* {location.pathname.startsWith("/employer") && <EmployerTopNavbar />} */}

      {/* <TopNavbar /> */}
      {/* <EmployerTopNavbar /> */}
      <Switch>
        {!jwt && (
          <Route
            path="/jobSeeker/reviews/search/:companyNameAndJobTitle/:location"
            component={JobSeekerReviewsSearchPage}
          ></Route>
        )}
        {jwt && user.role === 2 && (
          <Route
            path="/jobSeeker/reviews/search/:companyNameAndJobTitle/:location"
            component={JobSeekerReviewsSearchPage}
          ></Route>
        )}
        {!jwt && (
          <Route
            path="/jobSeeker/salaries/search/:jobTitle/:location"
            component={JobSeekerSalariesSearchPage}
          ></Route>
        )}
        {jwt && user.role === 2 && (
          <Route
            path="/jobSeeker/salaries/search/:jobTitle/:location"
            component={JobSeekerSalariesSearchPage}
          ></Route>
        )}
        <JobSeekerRoute
          exact
          path="/jobSeeker"
          component={JobSeekerHome}
        ></JobSeekerRoute>
        <JobSeekerRoute
          path="/jobSeekerProfile"
          component={JobSeekerProfile}
        ></JobSeekerRoute>
        {!jwt && (
          <Route
            exact
            path="/jobSeeker/reviews"
            component={JobSeekerReviewsPage}
          ></Route>
        )}

        {jwt && user.role === 2 && (
          <Route
            exact
            path="/jobSeeker/reviews"
            component={JobSeekerReviewsPage}
          ></Route>
        )}
        {!jwt && (
          <Route
            path="/jobSeeker/salaries"
            component={JobSeekerSalariesPage}
          ></Route>
        )}
        {jwt && user.role === 2 && (
          <Route
            path="/jobSeeker/salaries"
            component={JobSeekerSalariesPage}
          ></Route>
        )}
        <Route path="/companydetails/:id" component={CompanyHome}></Route>
        <JobSeekerRoute
          path="/company/:id/addReview"
          component={AddReview}
        ></JobSeekerRoute>
        <EmployeerRoute
          exact
          path="/employer"
          component={CompanyDetails}
        ></EmployeerRoute>
        <EmployeerRoute
          exact
          path="/employer/reviews"
          component={EmployerReviews}
        ></EmployeerRoute>
        <EmployeerRoute
          exact
          path="/employer/jobPostings"
          component={EmployerJobPostings}
        ></EmployeerRoute>
        <EmployeerRoute
          exact
          path="/employer/applicants"
          component={EmployerApplicants}
        ></EmployeerRoute>
        <EmployeerRoute
          exact
          path="/employer/reports"
          component={EmployerReports}
        ></EmployeerRoute>
        {!jwt && (
          <Route
            path="/jobSeekerLandingPage"
            component={JobSeekerLandingPage}
          ></Route>
        )}
        {jwt && user.role === 2 && (
          <Route
            path="/jobSeekerLandingPage"
            component={JobSeekerLandingPage}
          ></Route>
        )}

        <JobSeekerRoute
          path="/jobSeeker/myJobs"
          component={JobSeekerMyJobs}
        ></JobSeekerRoute>
        <JobSeekerRoute
          path="/jobSeeker/myJobs/savedJobs"
          component={JobSeekerSavedJobs}
        ></JobSeekerRoute>
        <JobSeekerRoute
          path="/jobSeeker/myJobs/appliedJobs"
          component={JobSeekerAppliedJobs}
        ></JobSeekerRoute>
        <JobSeekerRoute
          path="/jobSeeker/myReviews"
          component={JobSeekerMyReviews}
        ></JobSeekerRoute>
        <AdminRoute path="/admin" component={AdminDashboard}></AdminRoute>
        <AdminRoute
          path="/companyProfilePage"
          component={CompanyProfilePage}
        ></AdminRoute>
        <AdminRoute
          path="/analyticsDashboard"
          component={AnalyticsDashboard}
        ></AdminRoute>

        <JobSeekerRoute
          path="/jobSearchResults"
          component={JobSearchResults}
        ></JobSeekerRoute>

        <Route
          exact
          path="/employer/companyDetails"
          component={CompanyDetails}
        ></Route>
        <Route
          exact
          path="/employer/employerDetails"
          component={EmployerDetails}
        ></Route>

        <BaseRoute path="/signIn/:type" component={JobSeekerSignIn}></BaseRoute>

        <BaseRoute path="/signUp/" component={SignUpPage}></BaseRoute>

        <BaseRoute exact path="/login" component={SignInPage}></BaseRoute>
        <Route exact path="/logout" component={Logout}></Route>
        <BaseRoute
          exact
          path="/home"
          component={JobSeekerLandingPage}
        ></BaseRoute>
        {/* <Redirect from="/" exact to="/jobSeekerLandingPage" /> */}
        <Redirect from="/" exact to="/home" />
        <Redirect from="/jobSeeker" exact to="/jobSeekerLandingPage" />
      </Switch>
    </div>
  );
}

export default App;
