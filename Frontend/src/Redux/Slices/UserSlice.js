import { createSlice } from "@reduxjs/toolkit";

// Restore the logged-in user from localStorage so a refresh keeps the session.
const getInitialUser = () => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const initialUser = getInitialUser();

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
    isAuthenticated: Boolean(initialUser),
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      try {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } catch {
        /* ignore storage errors */
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      try {
        localStorage.removeItem("user");
      } catch {
        /* ignore storage errors */
      }
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
