import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CurrentPlayingUrl: "",
  CurrentPlayingImg: "",
  CurrentPlayingName: "",
  CurrentPlayingArtist: "",
  CurrentPlayingArtistID: "",
  CurrentPlaylistInfo: [],
  CurrentPlaylistTracks: [],
  CurrentPlayingIndex: "",
  IsFromPlaylist: "",
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

    SetPlaylist: (state, action) => {
      state.CurrentPlaylistInfo = action.payload.playlistInfo;
      state.CurrentPlaylistTracks = action.payload.playlistTracks;
      state.IsFromPlaylist = true;
      state.CurrentPlayingIndex = 0;
    },
    SetIndex: (state, action) => {
      state.CurrentPlayingIndex = action.payload;
    },
  },
});

export const { SetCurrentPlaying, SetPlaylist, SetIndex } = Songslice.actions;

export default Songslice.reducer;
