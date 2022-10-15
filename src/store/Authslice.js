import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  accessToken: "",
  refreshToken: "",
  expiresIn: "",
  id: "",
  name: "",
};

export const getCredentails = createAsyncThunk("getCredentials", (code) => {
  const response = axios
    .post("http://localhost:4000/login", {
      code,
    })
    .then((res) => {
      window.history.pushState({}, null, "/");
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
});

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCredentails.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.expiresIn = action.payload.expiresIn;
    });
  },

  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});

export const { setUser } = AuthSlice.actions;

export default AuthSlice.reducer;
