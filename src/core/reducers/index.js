import { combineReducers } from 'redux';

import postCreateReducer from './postCreateReducer';
import postsListReducer from './postsListReducer';
import userReducer from './userReducer';

const appReducer = combineReducers({
  postCreate: postCreateReducer,
  postsList: postsListReducer,
  user: userReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
