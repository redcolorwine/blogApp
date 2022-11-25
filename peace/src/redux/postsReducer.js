import { blogApi } from "../api/api"

let initialState = {
    posts: {},
    menuPosts: {},
    currentPost: {},
    isPostsLoading: true,
    isMenuLoading: true,
}

let PostsReducer = (state = initialState, action) => {
    switch (action.type) {

        case "SET_POSTS": {
            return {
                ...state,
                posts: action.posts,
            }
        }
        case "SET_MENU_POSTS": {
            return {
                ...state,
                menuPosts: action.menuPosts,
            }
        }
        case "SET_CURRENT_POST": {
            return {
                ...state,
                currentPost: action.currentPost,
            }
        }

        case 'SET_IS_LOADING': {
            return {
                ...state,
                isPostsLoading: action.loading
            }
        }
        case 'SET_IS_MENU_LOADING': {
            return {
                ...state,
                isMenuLoading: action.isMenuLoading
            }
        }
        default: {
            return state;
        }
    }
}

export const setPosts = (posts) => {
    return {
        type: "SET_POSTS",
        posts
    }
}
export const setMenuPosts = (menuPosts) => {
    return {
        type: "SET_MENU_POSTS",
        menuPosts
    }
}
export const setCurrentPost = (currentPost) => {
    return {
        type: "SET_CURRENT_POST",
        currentPost
    }
}
export const setPostsThunk = (cat) => {
    return (dispatch) => {
        blogApi.getPosts(cat).then(response => {
            dispatch(setPosts(response));
        }).then(() => {
            dispatch(setIsLoading(false));
        })
    }
}
export const setMenuPostsThunk = (cat) => {
    return (dispatch) => {
        blogApi.getPosts(cat).then(response => {
            dispatch(setMenuPosts(response));
        }).then(() => {
            dispatch(setIsMenuLoading(false));
        })
    }
}
export const setCurrentPostThunk = (postId) => {
    return (dispatch) => {
        blogApi.getPost(postId).then(response => {
            dispatch(setCurrentPost(response));
        }).then(() => {
            dispatch(setIsLoading(false));
        })
    }
}
export const updateViewPost = (postId) => {
    return (dispatch) => {
        blogApi.updateViewPost(postId).then(response => {
            console.log(response);
        })
    }
}
export const deletePostThunk = (postId) => {
    return (dispatch) => {
        blogApi.deletePost(postId).then(response => {
            dispatch(setCurrentPost(response.data));
        })
    }
}
export const setIsLoading = (loading) => { return { type: 'SET_IS_LOADING', loading } }
export const setIsMenuLoading = (loading) => { return { type: 'SET_IS_MENU_LOADING', loading } }
export default PostsReducer;