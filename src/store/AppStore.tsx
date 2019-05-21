import {createStore} from 'redux';
import reducers from "./reducers/bookmarksReducer";

const store = createStore(
    reducers);
export { store };
