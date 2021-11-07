import { Switch, Route } from "react-router-dom";
import JobSeekerHome from "./components/JobSeeker/JobSeekerHome";
import EmployerHome from "./components/Employer/EmployerHome";
import Dashboard from "./components/Admin/Dashboard";
import CompanyHome from "./components/JobSeeker/CompanyDetails/CompanyHome";
import AddReview from "./components/JobSeeker/CompanyDetails/AddReview";
import "./App.css";
function App() {
  return (
    <div className="App">
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
        <Route path="/admin">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
