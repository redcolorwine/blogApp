import { connect } from "react-redux"
import { loginThunk, setIsLoading, setUserName, setUserPassword, setUsersInput } from "../../redux/authReducer"
import Login from "./login"

let mapStateToProps = (state) => {
    return {
        username: state.auth.username,
        password: state.auth.password,
        currentUser: state.auth.currentUser,
        isAuth: state.auth.isAuth,
        err: state.auth.err,
        isLoading: state.auth.isLoading
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setUserName: (username) => {
            dispatch(setUserName(username))
        },
        setUserPassword: (password) => {
            dispatch(setUserPassword(password))
        },
        loginThunk: (username, password) => {
            dispatch(loginThunk(username, password))
        },
        setIsLoading: (isLoading) => {
            dispatch(setIsLoading(isLoading))
        },
    }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;