import {tag} from "../../model/tag";

export const addTag = (data: tag[]) => {
    return {
        type: 'ADD_TAG',
        payload: data
    }
};

export const deleteTag = (data: number) => {
    return {
        type: 'DELETE_TAG',
        payload: data
    }
};
