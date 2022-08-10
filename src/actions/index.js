import jsonPlaceholder from "../api/jsonPlaceholder";
import _ from 'lodash';


export const fetchBlogsAndUsers = () => {
    return async (dispatch,getState) => {
        await dispatch(fetchBlogs());
        const userIds = _.uniq(_.map(getState().blogs,'userId'));
        userIds.forEach(id => dispatch(fetchUser(id)));
    };
};

export const fetchBlogs = () => {
    return async (dispatch,getState) => {
        const response = await jsonPlaceholder.get('/posts');
        dispatch({type : 'FETCH_BLOGS', payload : response.data});     
    };    
};

export const fetchUser = (userId) => {
    return async (dispatch,getState) => {
        const response = await jsonPlaceholder.get(`/users/${userId}`);;
        dispatch({type : 'FETCH_USER', payload : response.data});     
    };    
};


/* Memoizing example 
export const fetchUser = (userId)=> (dispatch,getState) => {
       _fetchUser(userId,dispatch);
};

/**
 * Memoizing used when user data is not changing,
 * Data can be fetched only once, however if data changes over time line we need to have alternate solution
 * 

const _fetchUser = _.memoize(async(id,dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
        dispatch({type:'FETCH_USER',payload:response.data});
});
 */


