import lockr from 'lockr';

const loginRequested = () => {
  return {
    type: 'FETCH_LOGIN_REQUEST',
  };
};

const loginLoaded = (newBooks) => {
  return {
    type: 'FETCH_LOGIN_SUCCESS',
    payload: newBooks,
  };
};

const loginError = (error) => {
  return {
    type: 'FETCH_LOGIN_FAILURE',
    payload: error,
  };
};

const registrationRequested = () => {
  return {
    type: 'FETCH_REGISTRATION_REQUEST',
  };
};

const registrationLoaded = (newBooks) => {
  return {
    type: 'FETCH_REGISTRATION_SUCCESS',
    payload: newBooks,
  };
};

const registrationError = (error) => {
  return {
    type: 'FETCH_REGISTRATION_FAILURE',
    payload: error,
  };
};

const clearUserData = () => {
  lockr.flush();
  return {
    type: 'CLEAR_USER_DATA',
  };
};

const userQuestionsRequested = () => {
  return {
    type: 'FETCH_USER_QUESTIONS_REQUEST',
  };
};

const userQuestionsLoaded = (newBooks) => {
  return {
    type: 'FETCH_USER_QUESTIONS_SUCCESS',
    payload: newBooks,
  };
};

const userQuestionsError = (error) => {
  return {
    type: 'FETCH_USER_QUESTIONS_FAILURE',
    payload: error,
  };
};

export {
  loginRequested,
  loginLoaded,
  loginError,
  registrationRequested,
  registrationLoaded,
  registrationError,
  clearUserData,
  userQuestionsRequested,
  userQuestionsLoaded,
  userQuestionsError,
};
