import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import JobSeekerHome from './components/JobSeeker/JobSeekerHome';
import EmployerHome from './components/Employer/EmployerHome';
import Dashboard from './components/Admin/Dashboard';
import NotificationProvider from './components/Notifications/notification-provider';
import CompanyHome from './components/JobSeeker/CompanyDetails/CompanyHome';
import AddReview from './components/JobSeeker/CompanyDetails/AddReview';
import { CompanyPhotosPage } from './components/Company-Photos-Page';

import store from './redux/store';

import './App.css';
function App() {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <Switch>
          <Route path="/jobSeeker">
            <JobSeekerHome />
          </Route>
          <Route path="/employer">
            <EmployerHome />
          </Route>
          <Route path="/companydetails">
            <CompanyHome />
          </Route>
          <Route path="/company/addReview">
            <AddReview />
          </Route>
          <Route path="/admin">
            <Dashboard />
          </Route>
          <Route path="/:companyId/photos" component={CompanyPhotosPage}></Route>
        </Switch>
      </NotificationProvider>
    </Provider>
  );
}

export default App;
