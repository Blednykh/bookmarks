const tagsReducer = (state: string[] = [], action: any) => {
    let newTags: string[];
    switch (action.type) {
        case 'ADD_TAG':
            newTags = state;
            action.payload.forEach((item: string) =>{
                if(!newTags.some((stateItem:string)=>{return stateItem === item}))
                    newTags.push(item);
            });
            return [...newTags];
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
