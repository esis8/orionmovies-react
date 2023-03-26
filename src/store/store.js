import { configureStore } from '@reduxjs/toolkit';


const initialState ={
    selectedGenre: '',
    selectFilter: 'ALL',
    searchValue: ''
};

const reducer = (state = initialState, action)=>{
    switch (action.type){
            case 'SET_SELECTED_GENRE':
                return {
                    ...state,
                    selectedGenre: action.payload
                };
            case 'SET_FILTER':
                return {
                    ...state,
                    selectFilter: action.payload
                };
            case 'SET_SEARCH':
                return {
                    ...state,
                    searchValue: action.payload
                };    
        default:
            return state;        
    }
};

const store = configureStore({
    reducer: reducer,
});

export default store;


