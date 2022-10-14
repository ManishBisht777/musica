import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CurrentPlaying: "",
};

export const Songslice = createSlice({
  name: "Song",
  initialState,

  reducers: {
    SetCurrentPlaying: (state, action) => {
      state.CurrentPlaying = action.payload;
    },
  },
});

export const { SetCurrentPlaying } = Songslice.actions;

export default Songslice.reducer;
