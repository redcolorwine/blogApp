import { connect } from "react-redux"
import { setIsLoading, setMenuPostsThunk, setPostsThunk } from "../../../redux/postsReducer"
import MenuBlock from "./menuBlock"

let mapStateToProps = (state) => {
    return {
        newsItems: state.news.newsItems,
        posts: state.posts.posts,
        menuPosts: state.posts.menuPosts,
        isPostsLoading: state.posts.isPostsLoading,
        isMenuLoading:state.posts.isMenuLoading
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setPosts: (cat) => {
            dispatch(setPostsThunk(cat));
        },
        setMenuPosts: (cat) => {
            dispatch(setMenuPostsThunk(cat))
        }
    }
}

const MenuBlockContainer = connect(mapStateToProps, mapDispatchToProps)(MenuBlock);

export default MenuBlockContainer;