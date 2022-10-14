import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "./Authslice";
import SongReducer from "./Songslice";

export const store = configureStore({
  reducer: {
    Auth: AuthReducer,
    Song: SongReducer,
  },
});
