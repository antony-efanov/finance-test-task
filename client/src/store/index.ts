import { configureStore } from "@reduxjs/toolkit";
import quotesSlice from "./slices/Quotes/quotesSlice";

export const store = configureStore({
  reducer: {
    quotes: quotesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
