const bookmarksReducer = (state: any = {
    bookmarks: []
}, action: any) => {
    let newBookmarks;
    switch (action.type) {
        case 'ADD':
            return {
                ...state,
                bookmarks: [
                    ...state.bookmarks,
                    {
                        id: action.payload.id,
                        url: action.payload.url,
                        title: action.payload.title,
                        tags: action.payload.tags,
                        date: action.payload.date,
                    }]
            };
        case 'DELETE':
            newBookmarks = state.bookmarks;
            newBookmarks.splice(action.payload.index, 1);
            return {...state, bookmarks: [...newBookmarks]};
        case 'EDIT':
            return {...state, bookmarks: [...action.payload]};
        default:
            return state;
    }
};

export default bookmarksReducer;
