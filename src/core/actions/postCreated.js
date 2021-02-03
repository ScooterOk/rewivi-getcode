const postCreatedUpdate = (update) => {
  return {
    type: 'CREATE_POST_UPDATE',
    payload: update,
  };
};

const postCreatedRequested = () => {
  return {
    type: 'FETCH_CREATE_POST_REQUEST',
  };
};

const postCreatedLoaded = (data) => {
  return {
    type: 'FETCH_CREATE_POST_SUCCESS',
    payload: data,
  };
};

const postCreatedError = (error) => {
  return {
    type: 'FETCH_CREATE_POST_FAILURE',
    payload: error,
  };
};

export { postCreatedUpdate, postCreatedRequested, postCreatedLoaded, postCreatedError };
