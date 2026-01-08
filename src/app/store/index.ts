import { saveIDslice } from "@/features/form-builder";
import { themeSlice } from "@/features/switch-theme";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    formID: saveIDslice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
