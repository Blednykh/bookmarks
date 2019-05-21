import {createStore} from 'redux';
import reducers from "./reducers/allReducers";

const store = createStore(
    reducers);
export { store };
