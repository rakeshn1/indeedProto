import { Switch, Route } from "react-router-dom";
import JobSeekerHome from "./components/JobSeeker/JobSeekerHome";
import EmployerHome from "./components/Employer/EmployerHome";
import Dashboard from "./components/Admin/Dashboard";
import JobSeekerLandingPage from "./components/JobSeeker/JobSeekerLandingPage";
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
