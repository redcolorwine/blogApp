import { connect } from "react-redux"
import { logoutThunk, setAuthUserData } from "../../redux/authReducer"
import Header from "./header"

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        currentUser: state.auth.currentUser
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logoutThunk())
        },
        setAuthUserData: (currentUser) => {
            dispatch(setAuthUserData(currentUser));
        }
    }
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;