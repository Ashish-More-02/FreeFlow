import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./Slices/appConfigSlice";

const appStore = configureStore({
    reducer:{
        appconfigslice : appConfigReducer,
    },
})


export default appStore;