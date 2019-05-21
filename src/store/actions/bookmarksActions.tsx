export const addBookmark = (data: any) => {
    return {
        type: 'ADD',
        payload: data
    }
}

export const editBookmark = (data: any) => {
    return {
        type: 'EDIT2',
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
