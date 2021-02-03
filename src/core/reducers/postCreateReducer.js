const initialState = {
  post: {
    title: '',
    description: '',
    id: null,
    questions: [],
    tags: [],
    client_name: '',
    client_description: '',
    client_logo: '',
    video: null,
    status: 'published', // TODO will wix original option
  },
  loader: false,
  error: null,
  success: false,
};

const postCreateReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'CREATE_POST_UPDATE':
      return {
        ...state,
        post: {
          ...state.post,
          ...payload,
        },
      };

    case 'FETCH_CREATE_POST_REQUEST':
      return {
        ...state,
        loader: true,
        error: null,
        success: false,
      };

    case 'FETCH_CREATE_POST_SUCCESS':
      return {
        post: {
          ...state.post,
          ...payload,
        },
        loader: false,
        success: true,
      };

    case 'FETCH_CREATE_POST_FAILURE':
      return {
        ...state,
        loader: false,
        error: payload,
        success: false,
      };

    default:
      return state;
  }
};

export default postCreateReducer;
