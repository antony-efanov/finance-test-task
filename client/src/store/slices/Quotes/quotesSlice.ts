import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, QuoteType } from "./types";

const quotesInitialState: InitialState = {
  quotes: [],
  favoriteQuotes: [],
  interval: null,
};

const quotesSlice = createSlice({
  name: "quotes",
  initialState: quotesInitialState,
  reducers: {
    setQuotes(state, action) {
      state.quotes = action.payload;
    },
    addFavoriteQuote(state, action: PayloadAction<QuoteType>) {
      state.favoriteQuotes.push(action.payload);
    },
    deleteFavoriteQuote(state, action: PayloadAction<QuoteType>) {
      state.favoriteQuotes = state.favoriteQuotes.filter(
        (quote) => quote.ticker !== action.payload.ticker
      );
    },
    setInterval(state, action) {
      state.interval = action.payload;
    },
  },
});

export const { setQuotes, addFavoriteQuote, deleteFavoriteQuote, setInterval } =
  quotesSlice.actions;
export default quotesSlice.reducer;
