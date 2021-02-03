import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { notification } from 'antd';
import Layout from '../../components/Layout/Layout';
import LoginForm from '../../components/LoginForm';

import { fetchLogin } from '../../core/services';
import { clearUserData } from '../../core/actions';

import './style.scss';
import { IconWarning } from '../../components/icons';

const LoginPage = (props) => {
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

  // useEffect(() => {
  //   if (success) history.push('/job-list/');
  //   if (error) {
  //     notification.error({
  //       className: 'error-message',
  //       description: error,
  //       icon: <IconWarning />,
  //       onClose: () => {
  //         dispatch(clearUserData());
  //       },
  //     });
  //   }
  // }, [success, error]);

  const loginRequest = (loginData) => {
    fetchLogin(dispatch)(loginData, history);
  };

  return (
    <Layout isLogged={false} className="hello-page">
      <div className="hello-page__wrapper">
        <h1>
          Find the best candidate <br /> with Rewivi
        </h1>
        <div className="hello-page__form">
          <LoginForm loginRequest={loginRequest} loading={loader} />
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
