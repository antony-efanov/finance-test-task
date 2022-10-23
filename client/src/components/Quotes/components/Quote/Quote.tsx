import { FC, useState } from "react";
import { IProps } from "./types";
import { QuoteType } from "../../types";
import { ReactComponent as Arrow } from "../../../../assets/icons/arrow.svg";
import { ReactComponent as Favorite } from "../../../../assets/icons/favorite.svg";
import { ReactComponent as Info } from "../../../../assets/icons/info.svg";

import { useAppDispatch, useAppSelector } from "../../../../hooks/useRedux";
import {
  addFavoriteQuote,
  deleteFavoriteQuote,
} from "../../../../store/slices/Quotes/quotesSlice";

const Quote: FC<IProps> = ({
  ticker,
  price,
  change,
  exchange,
  change_percent,
  dividend,
  profit,
  last_trade_time,
}) => {
  const currentQuote = {
    ticker: ticker,
    price: price,
    exchange: exchange,
    change: change,
    change_percent: change_percent,
    dividend: dividend,
    profit: profit,
    last_trade_time: last_trade_time,
  };

  const { favoriteQuotes } = useAppSelector((state) => state.quotes);
  const dispatch = useAppDispatch();

  const onClickFavorite = (currentQuote: QuoteType) => {
    const isFavorited = favoriteQuotes.some(
      (quote) => quote.ticker === currentQuote.ticker
    );
    if (isFavorited) {
      dispatch(deleteFavoriteQuote(currentQuote));
    } else {
      dispatch(addFavoriteQuote(currentQuote));
    }
  };

  const [moreVisibility, setMoreVisibility] = useState(false);

  const onMoreVisibility = () => {
    setMoreVisibility((prev) => !prev);
  };

  const checkIsGrowing = () => {
    return change_percent.indexOf("-") === -1 ? "growing" : "falling";
  };

  const [disabled, setDisabled] = useState(false);

  const onClickDisable = () => {
    setDisabled((prev) => !prev);
  };

  return (
    <div className="quote">
      <div className="quote__main-info">
        <div className="quote__main">
          <h1 className={`quote__main_ticker quote__main_${ticker}`}>
            {ticker}
          </h1>
          <h2 className="quote__main_price">{disabled ? "Disabled" : price}</h2>
        </div>
        {!disabled && (
          <div className="quote__change">
            <div
              className={`quote__change_percent quote__change_percent_${checkIsGrowing()}`}
            >
              {change_percent}
              {"%"}
            </div>
            <div className="quote__change_price">{change}</div>
          </div>
        )}
      </div>
      <button
        onClick={onMoreVisibility}
        className={
          moreVisibility ? "quote__display-more" : "quote__display-more hide"
        }
      >
        <Arrow />
      </button>
      <div className={moreVisibility ? "quote__more visible" : "quote__more"}>
        <div className="quote__more__income">
          <div className="quote__more__income_divident">
            dividend <span>{dividend}</span>
          </div>
          <div className="quote__more__income_profit">
            profit <span>{profit}</span>
          </div>
          <div className="quote__more__income_time">
            <Info title="Last trade time" className="icon" />
            <span>{last_trade_time}</span>
          </div>
        </div>
        <div className="quote__more__settings">
          <div className="quote__more__settings_favorite">
            <div className="text">Favorite</div>
            <Favorite className="icon" />
            <button onClick={() => onClickFavorite(currentQuote)}> add </button>
          </div>
          <div className="quote__more__settings_disable">
            <button onClick={onClickDisable}>Disable</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
