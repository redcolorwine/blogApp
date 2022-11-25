import { blogApi } from "../api/api"

let initialState = {
    myPosts: "",
    myViews: 10,
    profileLoading: true,
}


const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_MY_POSTS":
            return {
                ...state,
                myPosts: action.myPosts
            }
        case "SET_PROFILE_LOADING":
            return {
                ...state,
                profileLoading: action.loading
            }
        case "SET_MY_VIEWS":
            return {
                ...state,
                myViews: action.views
            }
        default:
            {
                return state
            }
    }
}



export const setMyPostsThunk = (userId) => {
    return (dispatch) => {
        blogApi.getAuthorPosts(userId).then(response => {
            dispatch(setMyPosts(response));
        }).then(() => {
            dispatch(setProfileLoading(false));
        })
    }
}

export const setMyPosts = (myPosts) => { return { type: "SET_MY_POSTS", myPosts } };
export const setMyViews = (views) => { return { type: "SET_MY_VIEWS", views } };
export const setProfileLoading = (loading) => { return { type: "SET_PROFILE_LOADING", loading } };

export default profileReducer;