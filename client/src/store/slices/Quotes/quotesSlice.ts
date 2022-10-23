import { createSlice } from "@reduxjs/toolkit";

type QuoteType = {
  ticker: string;
  exchange: string;
  price: string;
  change: string;
  change_percent: string;
  dividend: string;
  profit: string;
  last_trade_time: string;
};

export interface InitialState {
  quotes: QuoteType[];
  favoriteQuotes: QuoteType[];
  interval: number | null;
}

const quotesInitialState = {
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
    setInterval(state, action) {
      state.interval = action.payload;
    },
  },
});

export const { setQuotes, setInterval } = quotesSlice.actions;
export default quotesSlice.reducer;
