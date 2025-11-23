import { getLocalStorage } from "@/shared/lib";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  theme: getLocalStorage("theme", "light"),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<"light" | "dark">) {
      state.theme = action.payload;
      localStorage.setItem("theme", JSON.stringify(action.payload));
    },
  },
});

export const { setTheme } = themeSlice.actions;
