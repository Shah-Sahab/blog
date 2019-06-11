import { combineReducers }  from 'redux';
import postsReducer from './PostReducer';
import usersReducer from './usersReducer';

export default combineReducers({
    posts: postsReducer,
    users: usersReducer
});