import { connect } from "react-redux";
import { setIsPageLoading, setNews, setNewsThunk } from "../../redux/newsPageReducer";
import { setIsLoading, setPostsThunk } from "../../redux/postsReducer";
import News from "./news";

let mapStateToProps = (state) => {
    return {
        newsItems: state.news.newsItems,
        posts: state.posts.posts,
        isPostsLoading: state.posts.isPostsLoading,
        news: state.news.news,
        isPageLoading: state.news.isPageLoading
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setPosts: (cat) => {
            dispatch(setPostsThunk(cat));
        },
        setIsLoading: (loading) => {
            dispatch(setIsLoading(loading))
        },
        setNews: (cat) => {
            dispatch(setNewsThunk(cat))
        },
        setIsPageLoading: (isPageLoading) => {
            dispatch(setIsPageLoading(isPageLoading))
        }
        // getFilmsForMainPage: (page) => {
        //     dispatch(getMPFilmsThunkCreator(page))
        // }
    }
}

let NewsContainer = connect(mapStateToProps, mapDispatchToProps)(News);

export default NewsContainer;