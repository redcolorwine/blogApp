import { connect } from "react-redux"
import { setUserEmail, setUserName, setUserPassword, setUsersInput } from "../../redux/authReducer"
import Register from "./register"

let mapStateToProps = (state) => {
    return {
        username: state.auth.username,
        password: state.auth.password,
        email: state.auth.email,
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
        setUserEmail: (email) => {
            dispatch(setUserEmail(email))
        }
    }
}

const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(Register);

export default RegisterContainer;