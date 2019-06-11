import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    console.log('about to fetch posts');
    await dispatch(fetchPosts);
    console.log('fetch posts');
    const userIds = _.uniq(_.map(getState.posts, 'userId'));
    userIds.forEach(id => dispatch(fetchUser(id)));
};

/**
 * Fetches all the posts.
 * 
 * Observe how I have created this action creater is different from `fetchUser`. 
 */
export const fetchPosts = () => {
    return async (dispatch) => {
        const response = await jsonPlaceholder.get('/posts');
        dispatch({
            type: 'FETCH_POSTS',
            payload: response.data
        });
    };
};

/**
 * Fetch the user info.
 * 
 * Notice the syntaxual difference between `fetchPosts` and this action creater. 
 * 
 * Both syntaxes will work completely fine and are going to yield the result properly.
 * 
 * Here I am using es-15 syntax, where as in `fetchPosts` I am using a more detailed syntax. 
 * In es-15 you can reduce the number of brackets and shorten the code a bit over the expense of gaining complexity. 
 * To comprehend this piece of code please look at the above example.
 * 
 * 
 * @param {*} id 
 */
export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    });
};