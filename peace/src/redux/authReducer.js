import { blogApi } from "../api/api"

let initialState = {
    username: "test",
    password: "",
    email: "",
    currentUser: null,
    isAuth: false,
    err: null,
    isLoading: false,
}

let authReducer = (state = initialState, action) => {
    switch (action.type) {

        case "SET_USER_DATA":
            return {
                ...state,
                currentUser: action.currentUser,
            };
        case "SET_ERROR":
            return {
                ...state,
                err: action.err
            }
        case "SET_IS_LOADING":
            return {
                ...state,
                isLoading: action.isLoading
            }
        case "SET_IS_AUTH":
            return {
                ...state,
                isAuth: action.isAuth
            }
        case 'SET_USERNAME_INPUT': {

            return {
                ...state,
                username: action.username
            }
        }
        case 'SET_USERNAME_PASSWORD': {

            return {
                ...state,
                password: action.password
            }
        }
        case 'SET_USERNAME_EMAIL': {

            return {
                ...state,
                email: action.email
            }
        }
        default: return state
    }
}

export const loginThunk = (username, password) => {
    return (dispatch) => {
        blogApi.login(username, password).then(response => {
            localStorage.setItem("user", JSON.stringify(response.data));
            dispatch(setAuthUserData(response.data));
        }).catch(err => {
            dispatch(setError(err.response.data));
        })
    }
}

export const logoutThunk = () => {
    return (dispatch) => {
        blogApi.logout().then(() => {
            // dispatch(setIsAuth(false));
            localStorage.clear();
            dispatch(setAuthUserData(null));
        }).catch(err => {
            dispatch(setError(err.response.data));
        })
    }
}
export const setUserName = (username) => { return { type: 'SET_USERNAME_INPUT', username } }
export const setUserPassword = (password) => { return { type: 'SET_USERNAME_PASSWORD', password } }
export const setUserEmail = (email) => { return { type: 'SET_USERNAME_EMAIL', email } }
export const setAuthUserData = (currentUser) => {
    return {
        type: "SET_USER_DATA",
        currentUser
    }
}
export const setError = (err) => { return { type: "SET_ERROR", err } }
export const setIsAuth = (isAuth) => { return { type: "SET_IS_AUTH", isAuth } }
export const setIsLoading = (isLoading) => { return { type: "SET_IS_LOADING", isLoading } }
export default authReducer;