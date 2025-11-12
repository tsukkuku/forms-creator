import { getLocalStorage } from "@/shared/lib";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: getLocalStorage("theme", "light"),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", JSON.stringify(state.theme));
    },
  },
});

export const { setTheme } = themeSlice.actions;
