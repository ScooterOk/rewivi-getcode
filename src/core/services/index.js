import { bindActionCreators } from 'redux';
import { notification } from 'antd';
import lockr from 'lockr';
import * as actions from '../actions';
import { IconWarning } from '../../components/icons';
import history from '../../utils/history';

const { API_URL } = require('../constants').default;

const fetchPosts = (dispatch) => (params) => {
  const { postsRequested, postsLoaded, postsError, clearUserData } = bindActionCreators(actions, dispatch);
  params = params || '';

  const token = lockr.get('auth-key');
  postsRequested();
  let headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };
  fetch(`${API_URL}/api/job-postings/list${params}`, {
    method: 'GET',
    headers: headers,
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        return resp.json().then((json) => {
          const errorMessage =
            json.message === 'Unauthenticated.' ? 'Session expired. Please login again.' : json.message;

          if (json.message === 'Unauthenticated.') {
            clearUserData();
          }
          postsError(json.message);
          notification.error({
            className: 'error-message',
            description: errorMessage,
            icon: <IconWarning />,
          });
          throw new Error(json);
        });
      }
    })
    .then((data) => {
      postsLoaded(data);
    });
};

const fetchPostDelete = (dispatch) => (id) => {
  return new Promise((resolve, reject) => {
    const { postsDeleteRequested, postsDeleteLoaded, postsDeleteError } = bindActionCreators(actions, dispatch);
    const token = lockr.get('auth-key');

    postsDeleteRequested();
    fetch(`${API_URL}/api/job-postings/entity/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          const error = resp.json().then((json) => {
            postsDeleteError(json.message);
            throw new Error(json);
          });
          reject(error);
        }
      })
      .then((data) => {
        postsDeleteLoaded();
        resolve();
      });
  });
};

const fetchPostsCreate = (dispatch) => (post, mode, history) => {
  const { postCreatedRequested, postCreatedLoaded, postCreatedError } = bindActionCreators(actions, dispatch);
  const token = lockr.get('auth-key');
  postCreatedRequested();
  let headers = {
    //'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const formData = new FormData();
  for (let i in post.post) {
    if (i === 'questions') {
      post.post[i].forEach((el, n) => {
        formData.append('questions[' + n + '][title]', el.title);
        formData.append('questions[' + n + '][text_allowed]', el.text_allowed ? 1 : 0);
        formData.append('questions[' + n + '][in_library]', el.in_library ? 1 : 0);
        formData.append('questions[' + n + '][required]', el.required ? 1 : 0);
      });
    } else {
      if (post.post[i]) formData.append(i, post.post[i]);
    }
  }
  fetch(`${API_URL}/api/job-postings/creation/${mode}`, {
    method: 'POST',
    headers: headers,
    body: formData,
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        return resp.json().then((json) => {
          postCreatedError(json.message);
          notification.error({
            className: 'error-message',
            description: json.message,
            icon: <IconWarning />,
          });
          throw new Error(json);
        });
      }
    })
    .then((data) => {
      const post = {
        id: data.data.job_posting_id,
      };
      if (mode === 'draft') {
        notification.success({
          duration: 0,
          description: (
            <div>
              Your link <b className="notification-link">{data.data.link}</b>
            </div>
          ),
          icon: <IconWarning />,
        });
      }
      postCreatedLoaded(post);
      if (history) history.push('/job-list/');
    });
};

const fetchUserQestions = (dispatch) => (filter) => {
  const { userQuestionsRequested, userQuestionsLoaded, userQuestionsError } = bindActionCreators(actions, dispatch);
  const params = filter ? `?filter[title]=${filter}` : '';

  const token = lockr.get('auth-key');
  userQuestionsRequested();
  let headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };
  fetch(`${API_URL}/api/questions${params}`, {
    method: 'GET',
    headers: headers,
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        return resp.json().then((json) => {
          const errorMessage =
            json.message === 'Unauthenticated.' ? 'Session expired. Please login again.' : json.message;

          if (json.message === 'Unauthenticated.')
            notification.error({
              className: 'error-message',
              description: errorMessage,
              icon: <IconWarning />,
            });
          userQuestionsError(json.message);
          throw new Error(json);
        });
      }
    })
    .then((data) => {
      userQuestionsLoaded(data);
    });
};

const fetchLogin = (dispatch) => (loginData, history) => {
  let body = {
    email: loginData.email,
    password: loginData.password,
    remember_me: true,
  };

  const { loginRequested, loginLoaded, loginError } = bindActionCreators(actions, dispatch);

  loginRequested();
  fetch(`${API_URL}/api/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      //Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        return resp.json().then((json) => {
          loginError(json.message);
          notification.error({
            className: 'error-message',
            description: json.message,
            icon: <IconWarning />,
          });
          throw new Error(json);
        });
      }
    })
    .then((data) => {
      loginLoaded(true);
      const authDate = new Date();
      lockr.set('auth-key', data.data.token);
      lockr.set('session-token-expiry', authDate);
      history.push('/job-list/');
    });
};

const fetchRegistration = (dispatch) => (registrationData) => {
  let body = {
    name: registrationData.name,
    email: registrationData.email,
    country_id: registrationData.country_id,
    password: registrationData.password,
  };

  const { registrationRequested, registrationLoaded, registrationError } = bindActionCreators(actions, dispatch);

  registrationRequested();
  fetch(`${API_URL}/api/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      //Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        return resp.json().then((json) => {
          registrationError(json.message);
          notification.error({
            className: 'error-message',
            description: json.message,
            icon: <IconWarning />,
          });
          throw new Error(json);
        });
      }
    })
    .then((data) => {
      registrationLoaded(true);
      const authDate = new Date();
      lockr.set('auth-key', data.data.token);
      lockr.set('session-token-expiry', authDate);
    });
};

export { fetchPosts, fetchPostsCreate, fetchLogin, fetchRegistration, fetchPostDelete, fetchUserQestions };
