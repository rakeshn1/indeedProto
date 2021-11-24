import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import JobSeekerHome from "./components/JobSeeker/JobSeekerHome";
import EmployerHome from "./components/Employer/EmployerHome";
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

function App() {

  const location = useLocation();

  return (
    <div className="App">
      {
        location.pathname !== '/signIn/email' || location.pathname !== '/signIn/returningUser' || location.pathname !== '/signIn/newUser' && <TopNavbar />

      }

      <Switch>
        <Route path="/jobSeeker">
          <JobSeekerHome />
        </Route>
        <Route path="/jobSeekerProfile">
          <JobSeekerProfile />
        </Route>
        <Route path="/companydetails">
          <CompanyHome />
        </Route>
        <Route path="/company/addReview">
          <AddReview />
        </Route>
        <Route path="/employer">
          <EmployerHome />
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
