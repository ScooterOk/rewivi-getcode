import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import RegistrationForm from '../../components/RegistrationForm';

import { fetchRegistration } from '../../core/services';

import './style.scss';
import { notification } from 'antd';
import { IconWarning } from '../../components/icons';
import { clearUserData } from '../../core/actions';

const HowToStart = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loader = useSelector((state) => {
    return state.user.loader;
  });
  const success = useSelector((state) => {
    return state.user.success;
  });
  const error = useSelector((state) => {
    return state.user.error;
  });

  useEffect(() => {
    if (success) history.push('/how-to-start/');
    if (error) {
      notification.error({
        className: 'error-message',
        description: error,
        icon: <IconWarning />,
        onClose: () => {
          dispatch(clearUserData());
        },
      });
    }
  }, [success, error]);

  const registrationRequest = (data) => {
    fetchRegistration(dispatch)(data);
  };

  return (
    <Layout isLogged={false} className="hello-page">
      <div className="hello-page__wrapper">
        <h1>Log in or create your account to find the best candidate quickly</h1>
        <div className="hello-page__form">
          <RegistrationForm registrationRequest={registrationRequest} loading={loader} />
        </div>
      </div>
    </Layout>
  );
};

export default HowToStart;
