import { createSlice } from "@reduxjs/toolkit";

// Read the saved theme once at startup; default to dark mode.
const getInitialDarkMode = () => {
  try {
    const stored = localStorage.getItem("darkMode");
    return stored === null ? true : stored === "true";
  } catch {
    return true;
  }
};

const persistDarkMode = (value) => {
  try {
    localStorage.setItem("darkMode", String(value));
  } catch {
    /* ignore storage errors (e.g. private mode) */
  }
};

const appConfigSlice = createSlice({
  name: "appconfigslice",
  initialState: {
    toggleMenu: true,
    darkMode: getInitialDarkMode(),
  },
  reducers: {
    doToggleMenu: (state) => {
      state.toggleMenu = !state.toggleMenu;
    },
    closeMenu: (state) => {
      state.toggleMenu = false;
    },
    openMenu: (state) => {
      state.toggleMenu = true;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      persistDarkMode(state.darkMode);
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      persistDarkMode(state.darkMode);
    },
  },
});

export const { doToggleMenu, closeMenu, openMenu, toggleDarkMode, setDarkMode } =
  appConfigSlice.actions;

export default appConfigSlice.reducer;
