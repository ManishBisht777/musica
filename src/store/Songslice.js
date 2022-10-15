import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CurrentPlayingUrl: "",
  CurrentPlayingImg: "",
  CurrentPlayingName: "",
  CurrentPlayingArtist: "",
  CurrentPlayingArtistID: "",
};

export const Songslice = createSlice({
  name: "Song",
  initialState,

  reducers: {
    SetCurrentPlaying: (state, action) => {
      state.CurrentPlayingName = action.payload.name;
      state.CurrentPlayingImg = action.payload.image;
      state.CurrentPlayingArtist = action.payload.artist;
      state.CurrentPlayingUrl = action.payload.trackurl;
      state.CurrentPlayingArtistID = action.payload.artistid;
    },
  },
});

export const { SetCurrentPlaying } = Songslice.actions;

export default Songslice.reducer;
