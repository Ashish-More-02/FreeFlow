import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./Slices/appConfigSlice";
import ChatSlice from "./Slices/ChatSlice";
import userReducer from "./Slices/UserSlice";
import SearchReducer from "./Slices/SearchSlice";

const appStore = configureStore({
  reducer: {
    appconfigslice: appConfigReducer,
    chat: ChatSlice,
    user: userReducer,
    search: SearchReducer,
  },
});

export default appStore;
