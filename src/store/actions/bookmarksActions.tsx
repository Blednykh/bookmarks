import {bookmark} from "../../model/bookmark";

export const addBookmark = (data: bookmark) => {
    return {
        type: 'ADD',
        payload: data
    }
};


export const editBookmarks = (data: any) => {
    return {
        type: 'EDIT',
        payload: data
    }
};

export const deleteBookmark = (data: number) => {
    return {
        type: 'DELETE',
        payload: data
    }
};
