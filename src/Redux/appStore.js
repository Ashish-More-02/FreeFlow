import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./Slices/appConfigSlice";
import ChatSlice from "./Slices/ChatSlice";

const appStore = configureStore({
    reducer:{
        appconfigslice : appConfigReducer,
        chat : ChatSlice,
    },
})


export default appStore;