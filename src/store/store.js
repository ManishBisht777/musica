import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "./Authslice";

export const store = configureStore({
  reducer: {
    Auth: AuthReducer,
  },
});
