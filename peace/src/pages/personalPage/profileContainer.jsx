import { connect } from "react-redux";
import { getCurrentItem } from "../../redux/newsPageReducer";
import { deletePostThunk, setCurrentPostThunk, setPostsThunk } from "../../redux/postsReducer";
import { setMyPostsThunk } from "../../redux/profileReducer";
import Profile from "./profile";



let mapStateToProps = (state) => {
    return {
        currentUser: state.auth.currentUser,
        myViews: state.profile.myViews,
        myPosts: state.profile.myPosts,
        profileLoading: state.profile.profileLoading
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setMyPosts: (userId) => {
            dispatch(setMyPostsThunk(userId));
        }
    }
}

let ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileContainer;