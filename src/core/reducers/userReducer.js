import lockr from 'lockr';
import { notification } from 'antd';
import { IconWarning } from '../../components/icons';

const { LOCALSTORAGE_EXPIRES_TIME } = require('../constants').default;

const onlyAuthorisedAllowed = () => {
  const response = lockr.get('auth-key');
  if (response) {
    const authDate = lockr.get('session-token-expiry');
    if (authDate) {
      const aDate = new Date(authDate);
      const aNow = new Date();
      const milliseconds = aNow - aDate;
      const difference = Math.floor(milliseconds / 1000 / 60);
      if (difference >= LOCALSTORAGE_EXPIRES_TIME) {
        notification.error({
          className: 'error-message',
          description: 'Session expired. Please login again.',
          icon: <IconWarning />,
        });
        lockr.flush();
        return false;
      }
    } else {
      notification.error({
        className: 'error-message',
        description: 'Session expired. Please login again.',
        icon: <IconWarning />,
      });
      return false;
    }
    return true;
  }
  return false;
};

const initialState = {
  isloggedIn: onlyAuthorisedAllowed(),
  loader: false,
  error: null,
  success: false,
  questions: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_LOGIN_REQUEST':
      return {
        ...state,
        isloggedIn: false,
        loader: true,
        error: null,
        success: false,
      };

    case 'FETCH_LOGIN_SUCCESS':
      return {
        ...state,
        isloggedIn: action.payload,
        loader: false,
        error: null,
        success: true,
      };

    case 'FETCH_LOGIN_FAILURE':
      return {
        ...state,
        isloggedIn: false,
        loader: false,
        error: action.payload,
        success: false,
      };

    case 'FETCH_REGISTRATION_REQUEST':
      return {
        ...state,
        isloggedIn: false,
        loader: true,
        error: null,
        success: false,
      };

    case 'FETCH_REGISTRATION_SUCCESS':
      return {
        ...state,
        isloggedIn: action.payload,
        loader: false,
        error: null,
        success: true,
      };

    case 'FETCH_REGISTRATION_FAILURE':
      return {
        ...state,
        isloggedIn: false,
        loader: false,
        error: action.payload,
        success: false,
      };
    case 'CLEAR_USER_DATA':
      return {
        isloggedIn: false,
        loader: false,
        error: null,
        success: false,
        questions: [],
      };

    case 'FETCH_USER_QUESTIONS_REQUEST':
      return {
        ...state,
        questions: [],
        loader: true,
        error: null,
        success: false,
      };
    case 'FETCH_USER_QUESTIONS_SUCCESS':
      return {
        ...state,
        loader: false,
        error: null,
        success: true,
        questions: action.payload,
      };
    case 'FETCH_USER_QUESTIONS_FAILURE':
      return {
        ...state,
        loader: false,
        error: action.payload,
        success: false,
        questions: [],
      };

    default:
      return state;
  }
};

export default userReducer;
