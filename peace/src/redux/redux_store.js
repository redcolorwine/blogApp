import { applyMiddleware, combineReducers, createStore } from "redux";
import authReducer from "./authReducer";
import newsPageReducer from "./newsPageReducer";
import thunk from 'redux-thunk';
import PostsReducer from "./postsReducer";
import profileReducer from "./profileReducer";

let reducers = combineReducers({
    news: newsPageReducer,
    auth: authReducer,
    posts: PostsReducer,
    profile: profileReducer
})

let store = createStore(reducers, applyMiddleware(thunk));

export default store;