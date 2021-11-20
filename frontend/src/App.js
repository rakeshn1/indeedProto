import { Switch, Route, Link } from "react-router-dom";
import JobSeekerHome from "./components/JobSeeker/JobSeekerHome";
import JobSeekerReviewsPage from "./components/JobSeeker/JobSeekerReviewsPage";
import JobSeekerSalariesPage from "./components/JobSeeker/JobSeekerSalariesPage";
import JobSeekerReviewsSearchPage from "./components/JobSeeker/JobSeekerReviewsSearchPage";
import EmployerHome from "./components/Employer/EmployerHome";
import Dashboard from "./components/Admin/Dashboard";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Link to="/jobSeeker/reviews">Job seeker reviews</Link>
      <Link to="/jobSeeker/salaries">Job seeker salaries</Link>
      <Switch>
        <Route
          path="/jobSeeker/reviews/search/:companyName/:location"
          component={JobSeekerReviewsSearchPage}
        ></Route>
        <Route exact path="/jobSeeker">
          <JobSeekerHome />
        </Route>
        <Route exact path="/jobSeeker/reviews">
          <JobSeekerReviewsPage />
        </Route>
        <Route
          path="/jobseeker/salaries"
          component={JobSeekerSalariesPage}
        ></Route>
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
