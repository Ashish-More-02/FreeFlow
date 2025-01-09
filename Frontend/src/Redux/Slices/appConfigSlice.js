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
        },
        openMenu :(state)=>{
            state.toggleMenu = true;
        }
    }
});


export const {doToggleMenu,closeMenu,openMenu} = appConfigSlice.actions;

export default appConfigSlice.reducer;