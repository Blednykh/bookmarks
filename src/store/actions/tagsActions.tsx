export const addTag = (data: string) => {
    return {
        type: 'ADD_TAG',
        payload: data
    }
}


export const deleteTag = (data: number) => {
    return {
        type: 'DELETE_TAG',
        payload: data
    }
};
