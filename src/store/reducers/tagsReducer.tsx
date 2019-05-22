import {tag} from "../../model/tag";

const tagsReducer = (state: tag[] = [], action: any) => {
    let newTags: tag[];
    switch (action.type) {
        case 'ADD_TAG':
            newTags = state;
            action.payload.forEach((item: tag) => {
                let repeatTagIndex: number = -1;
                if ( newTags.find((stateItem: tag, index: number) => {
                    repeatTagIndex = index;
                    return stateItem.title === item.title}) !== undefined){
                    newTags[repeatTagIndex].count++;
                }
                else {
                    newTags.push(item);
                }
            });
            return [...newTags];
        case 'DELETE_TAG':
            newTags = state;
            if(newTags[action.payload].count>1){
                newTags[action.payload].count--;
            }
            else{
                newTags.splice(action.payload, 1);
            }
            return [...newTags];
        default:
            return state;
    }
};

export default tagsReducer;
