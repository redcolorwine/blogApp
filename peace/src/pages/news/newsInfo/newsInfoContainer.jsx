import { connect } from "react-redux";
import { getCurrentItem } from "../../../redux/newsPageReducer";
import { deletePostThunk, setCurrentPostThunk, setPostsThunk, updateViewPost } from "../../../redux/postsReducer";
import NewsInfo from "./newsInfo";

let mapStateToProps = (state) => {
    return {
        newsItems: state.news.newsItems,
        currentItemInfo: state.news.currentItemInfo,
        currentPost: state.posts.currentPost,
        currentUser: state.auth.currentUser,
        isPostsLoading: state.posts.isPostsLoading,
        posts: state.posts.posts,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getCurrentItem: (newsId) => {
            dispatch(getCurrentItem(newsId));
        },
        setCurrentPost: (postId) => {
            dispatch(setCurrentPostThunk(postId))
        },
        updateViewPost: (postId) => {
            dispatch(updateViewPost(postId))
        },
        deleteCurrentPost: (postId) => {
            dispatch(deletePostThunk(postId))
        },
        setPosts: (cat) => {
            dispatch(setPostsThunk(cat));
        },
    }
}

let NewsInfoContainer = connect(mapStateToProps, mapDispatchToProps)(NewsInfo);

export default NewsInfoContainer;