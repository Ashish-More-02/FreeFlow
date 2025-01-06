import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./Slices/appConfigSlice";
import ChatSlice from "./Slices/ChatSlice";
import userReducer from "./Slices/UserSlice";

const appStore = configureStore({
    reducer:{
        appconfigslice : appConfigReducer,
        chat : ChatSlice,
        user : userReducer,
    },
})


export default appStore;