import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IDState {
  id: string;
}

const initialState: IDState = {
  id: "",
};

export const saveIDslice = createSlice({
  name: "save",
  initialState,
  reducers: {
    saveID: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    resetID: (state) => {
      state.id = "";
    },
  },
});

export const { saveID, resetID } = saveIDslice.actions;
