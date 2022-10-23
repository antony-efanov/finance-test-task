import { io } from "socket.io-client";
import { useEffect, useRef } from "react";
import { QuoteType } from "./types";
import { Quote } from "./components/Quote";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { setQuotes } from "../../store/slices/Quotes/quotesSlice";

const socket = io("http://localhost:4000");

const Quotes = () => {
  const dispatch = useAppDispatch();
  const { quotes, interval } = useAppSelector((state) => state.quotes);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("start");
    });

    socket.on("ticker", (value) => {
      dispatch(setQuotes(value));
    });
  }, []);

  useEffect(() => {
    if (interval) {
      socket.emit("changeInterval", interval);
    }
  }, [interval]);

  return (
    <>
      <div className="quotes">
        {quotes.map((quote: QuoteType, index: number) => {
          return (
            <Quote
              key={index}
              ticker={quote.ticker}
              price={quote.price}
              change={quote.change}
              change_percent={quote.change_percent}
              dividend={quote.dividend}
              profit={quote.profit}
              last_trade_time={quote.last_trade_time}
            />
          );
        })}
      </div>
      {/* <input
        max={10}
        min={1}
        value={interval}
        onChange={(e) => setInterval(e.target.value)}
        type="number"
      />
      <button onClick={onChange}>Change</button> */}
    </>
  );
};

export default Quotes;
