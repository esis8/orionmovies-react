export const setSelectedGenre = (option) =>{
    return{
        type: 'SET_SELECTED_GENRE',
        payload: option
    }
}

export const setFilter = (option) => {
    return{
        type: 'SET_FILTER',
        payload: option
    }
}

export const setSearch = (option) => {
    return{
        type: 'SET_SEARCH',
        payload: option
    }
}
