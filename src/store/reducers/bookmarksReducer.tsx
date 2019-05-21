import {array, object} from "prop-types";

const bookmarksReducer = (state: any = {
    bookmarks: []
}, action: any) => {
    switch (action.type) {
        case 'ADD':
            console.log("ADD",action.payload);
            return {...state, bookmarks: [...state.bookmarks,{url: action.payload.url, description:action.payload.description}]};
        case 'DELETE':
            return state;
        default:
            return state;
    }
}

export default bookmarksReducer;
