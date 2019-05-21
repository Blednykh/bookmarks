export const addBookmark = (data: any) => {
    return {
        type: 'ADD',
        payload: data
    }
};

export const deleteBookmark = (data: number) => {
    return {
        type: 'DELETE',
        payload: data
    }
};
