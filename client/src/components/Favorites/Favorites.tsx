import { useAppSelector } from "../../hooks/useRedux";
import { QuoteType } from "../../store/slices/Quotes/types";
import { Quote } from "../Quotes/components/Quote";
import { ReactComponent as Arrow } from "../../assets/icons/arrow.svg";
import NothingHere from "../../assets/nothing.gif";

import { useState } from "react";

const Favorites = () => {
  const [favoritesOpened, setFavoritesOpened] = useState<boolean>(false);
  const { favoriteQuotes } = useAppSelector((state) => state.quotes);

  return (
    <section className="favorites">
      <div className="favorites__title">
        <button onClick={() => setFavoritesOpened((prev) => !prev)}>
          <Arrow
            className={
              favoritesOpened
                ? "favorites__title_arrow opened"
                : "favorites__title_arrow"
            }
          />
        </button>
        <h1>Favorites</h1>
        {favoriteQuotes.length === 0 ? null : (
          <div className="favorites__counter">{favoriteQuotes.length}</div>
        )}{" "}
      </div>

      <div
        className={
          favoritesOpened ? "favorite-quotes opened" : "favorite-quotes"
        }
      >
        {favoriteQuotes.length === 0 ? (
          <div className="favoritesEmpty">
            <h2 className="favoritesEmpty__text">Nothing here.</h2>
            <img
              className="favoritesEmpty__travolta"
              src={NothingHere}
              alt="noFavoritesGif"
            />
            <h2 className="favoritesEmpty__text">Add at least one quote.</h2>
          </div>
        ) : (
          <div className="quotes">
            {favoriteQuotes.map((quote: QuoteType, index: number) => {
              return (
                <Quote
                  key={index}
                  ticker={quote.ticker}
                  price={quote.price}
                  exchange={quote.exchange}
                  change={quote.change}
                  change_percent={quote.change_percent}
                  dividend={quote.dividend}
                  profit={quote.profit}
                  last_trade_time={quote.last_trade_time}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Favorites;
