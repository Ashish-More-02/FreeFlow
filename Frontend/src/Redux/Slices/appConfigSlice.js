import { createSlice } from "@reduxjs/toolkit";

const appConfigSlice = createSlice({
    name:"appconfigslice",
    initialState :{
        toggleMenu : true,
    },
    reducers :{
        doToggleMenu :(state)=>{
            state.toggleMenu = !state.toggleMenu;
        },
        closeMenu :(state)=>{
            state.toggleMenu = false;
        }
    }
});


export const {doToggleMenu,closeMenu} = appConfigSlice.actions;

export default appConfigSlice.reducer;