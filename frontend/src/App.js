import { Switch, Route } from "react-router-dom";
import JobSeekerHome from "./components/JobSeeker/JobSeekerHome";
import EmployerHome from "./components/Employer/EmployerHome";
import Dashboard from "./components/Admin/Dashboard";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/jobSeeker">
          <JobSeekerHome />
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
