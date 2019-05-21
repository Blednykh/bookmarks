const bookmarksReducer = (state: any = {
    bookmarks: []
}, action: any) => {
    let newBookmarks;
    switch (action.type) {
        case 'ADD':
            return {...state, bookmarks: [...state.bookmarks,{url: action.payload.url, description:action.payload.description}]};
        case 'DELETE':
            newBookmarks = state.bookmarks;
            newBookmarks.splice(action.payload.index,1);
            return {...state, bookmarks: [...newBookmarks]};
        case 'EDIT':
            return {...state, bookmarks: [...action.payload]};
        default:
            return state;
    }
}

export default bookmarksReducer;
