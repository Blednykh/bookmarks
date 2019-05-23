import {combineReducers} from "redux";
import bookmarksReducer from "./bookmarksReducer";
import tagsReducer from "./tagsReducer";

const allReducers = combineReducers({
    bookmarks: bookmarksReducer,
    tags: tagsReducer
});

export default allReducers;
