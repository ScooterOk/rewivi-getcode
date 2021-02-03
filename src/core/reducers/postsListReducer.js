const initialState = {
  postList: [],
  loader: false,
  error: null,
  deleteSuccess: false,
};

const postsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_POSTS_REQUEST':
      return {
        postList: [],
        loader: true,
        error: null,
        deleteSuccess: false,
      };

    case 'FETCH_POSTS_SUCCESS':
      return {
        ...state,
        loader: false,
        postList: action.payload,
      };

    case 'FETCH_POSTS_FAILURE':
      return {
        postList: [],
        loader: false,
        error: action.payload,
        deleteSuccess: false,
      };

    case 'FETCH_POSTS_DELETE_REQUEST':
      return {
        ...state,
        loader: true,
        error: null,
        deleteSuccess: false,
      };

    case 'FETCH_POSTS_DELETE_SUCCESS':
      return {
        ...state,
        loader: false,
        deleteSuccess: true,
      };

    case 'FETCH_POSTS_DELETE_FAILURE':
      return {
        ...state,
        loader: false,
        error: action.payload,
        deleteSuccess: false,
      };

    default:
      return state;
  }
};

export default postsListReducer;
