const postsRequested = () => {
  return {
    type: 'FETCH_POSTS_REQUEST',
  };
};

const postsLoaded = (newBooks) => {
  return {
    type: 'FETCH_POSTS_SUCCESS',
    payload: newBooks,
  };
};

const postsError = (error) => {
  return {
    type: 'FETCH_POSTS_FAILURE',
    payload: error,
  };
};

const postsDeleteRequested = () => {
  return {
    type: 'FETCH_POSTS_DELETE_REQUEST',
  };
};

const postsDeleteLoaded = () => {
  return {
    type: 'FETCH_POSTS_DELETE_SUCCESS',
  };
};

const postsDeleteError = (error) => {
  return {
    type: 'FETCH_POSTS_DELETE_FAILURE',
    payload: error,
  };
};

export { postsRequested, postsLoaded, postsError, postsDeleteRequested, postsDeleteLoaded, postsDeleteError };
