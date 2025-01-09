import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
    name:"search",
    initialState:{
        searchQuery:"",
    },
    reducers:{
        getSearchVideoResults : (state,action)=>{
            state.searchQuery = action.payload;
        }
    }
})


export const {getSearchVideoResults} = SearchSlice.actions;
export default SearchSlice.reducer;


