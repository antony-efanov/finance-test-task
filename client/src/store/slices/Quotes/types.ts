export type QuoteType = {
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
