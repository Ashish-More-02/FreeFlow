import { createSlice } from "@reduxjs/toolkit";

const ChatSlice = createSlice({
  name: "chat",
  initialState: {
    message: [],
  },
  reducers: {
    addChatMessage: (state, action) => {
      state.message.splice(50,1);
      state.message.unshift(action.payload);
    },
  },
});

export const { addChatMessage } = ChatSlice.actions;

export default ChatSlice.reducer;
