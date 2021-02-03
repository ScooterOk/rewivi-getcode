import React from 'react';
import { Route } from 'react-router-dom';
import HowToStart from '../../pages/HowToStart';
import CreateJob from '../../pages/CreateJob';
import JobList from '../../pages/JobList';
import Registration from '../../pages/Registration';
import Login from '../../pages/Login';
import PasswordRecovery from '../../pages/PasswordRecovery';
import ContactUs from '../../pages/ContactUs';
import CoreRouter from './CoreRouter';
import PrivateRoute from './PrivatRouter';

const routes = () => {
  return (
    <CoreRouter>
      <Route exact path="/" component={Registration} />
      <Route exact path="/sign-up/" component={Registration} />
      <Route exact path="/sign-in/" component={Login} />
      <Route exact path="/password-recovery/" component={PasswordRecovery} />
      <Route exact path="/contact-us/" component={ContactUs} />
      <PrivateRoute exact path="/how-to-start/" component={HowToStart} />
      <PrivateRoute exact path="/create-job-posting/" component={CreateJob} />
      <PrivateRoute exact path="/job-list/" component={JobList} />
    </CoreRouter>
  );
};

export default routes;
