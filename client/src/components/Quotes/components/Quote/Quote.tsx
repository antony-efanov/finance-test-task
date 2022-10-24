import { FC, useState } from "react";
import { IProps } from "./types";
import { QuoteType } from "../../types";
import { ReactComponent as Arrow } from "../../../../assets/icons/arrow.svg";
import { ReactComponent as Info } from "../../../../assets/icons/info.svg";

import Switch from "react-switch";
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

  const isFavorited = !!favoriteQuotes.some(
    (quote) => quote.ticker === currentQuote.ticker
  );

  const onClickFavorite = (currentQuote: QuoteType) => {
    if (isFavorited) {
      dispatch(deleteFavoriteQuote(currentQuote));
    } else {
      dispatch(addFavoriteQuote(currentQuote));
    }
  };

  const [moreVisibility, setMoreVisibility] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onMoreVisibility = () => {
    setMoreVisibility((prev) => !prev);
  };

  const checkIsGrowing = () => {
    if (change_percent === "0.00") return "zero";
    return change_percent.indexOf("-") === -1 ? "growing" : "falling";
  };

  const onClickDisable = () => {
    setDisabled((prev) => !prev);
  };

  return (
    <div className={disabled ? "quote disabled" : "quote"}>
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
            dividend <span>{disabled ? "0.00" : dividend}</span>
          </div>
          <div className="quote__more__income_profit">
            profit <span>{disabled ? "0.00" : profit}</span>
          </div>
          <div className="quote__more__income_time">
            <Info
              title={`${last_trade_time} Last trade time`}
              className="icon"
            />
            <span>{last_trade_time}</span>
          </div>
        </div>
        <div className="quote__more__settings">
          <div className="quote__more__settings_favorite">
            <div className="text">Favorite</div>
            <Switch
              onChange={() => onClickFavorite(currentQuote)}
              checked={isFavorited}
              disabled={disabled ? true : false}
              width={38}
              height={16}
              className="favorite-switch"
              uncheckedIcon={false}
              offColor={"#c7c7c7"}
            />
          </div>

          <div className="quote__more__settings_disable">
            <div>Disable</div>
            <Switch
              onChange={onClickDisable}
              checked={disabled}
              width={38}
              height={16}
              className="disable-switch"
              offColor={"#c7c7c7"}
              onColor={"#b34040"}
              uncheckedIcon={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
