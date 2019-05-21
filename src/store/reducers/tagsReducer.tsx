const tagsReducer = (state: string[] = [], action: any) => {
    let newTags;
    switch (action.type) {
        case 'ADD_TAG':
            return [...state, action.payload];
        case 'DELETE_TAG':
            newTags = state;
            newTags.splice(action.payload.index,1);
            return [...newTags];
        case 'EDIT_TAG':
            return {...state, tags: [...action.payload]};
        default:
            return state;
    }
}

export default tagsReducer;
