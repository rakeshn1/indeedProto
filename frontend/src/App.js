import { Switch, Route } from "react-router-dom";
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

function App() {
  return (
    <div className="App">
      <TopNavbar />
      <Switch>
        <Route path="/jobSeeker">
          <JobSeekerHome />
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

      </Switch>
    </div>
  );
}

export default App;
