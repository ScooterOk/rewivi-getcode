import React from 'react';
import { notification } from 'antd';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { IconWarning } from '../../components/icons';
import { clearUserData } from '../actions';

const PrivateRoute = ({ component: Component, ...rest }) => {
  if (!rest.isloggedIn) {
    clearUserData();
    notification.error({
      className: 'error-message',
      description: 'Session expired. Please login again',
      icon: <IconWarning />,
    });
  }

  return <Route {...rest} render={(props) => (rest.isloggedIn ? <Component /> : <Redirect to="/sign-in/" />)} />;
};

const mapStateToProps = (state) => {
  return {
    isloggedIn: state.user.isloggedIn,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
