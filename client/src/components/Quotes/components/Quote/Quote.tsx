import { FC, useState } from "react";
import { IProps } from "./types";
import { ReactComponent as Arrow } from "../../../../assets/icons/arrow.svg";
import { ReactComponent as Favorite } from "../../../../assets/icons/favorite.svg";
import { ReactComponent as Info } from "../../../../assets/icons/info.svg";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useRedux";

const Quote: FC<IProps> = ({
  ticker,
  price,
  change,
  change_percent,
  dividend,
  profit,
  last_trade_time,
}) => {
  const favoriteQuotes = useAppSelector((state) => state.quotes.favoriteQuotes);

  const checkIsFavorited = (ticker: string) => {};

  const [moreVisibility, setMoreVisibility] = useState(false);

  const onMoreVisibility = () => {
    setMoreVisibility((prev) => !prev);
  };

  const checkIsGrowing = () => {
    return change_percent.indexOf("-") === -1 ? "growing" : "falling";
  };

  return (
    <div className="quote">
      <div className="quote__main-info">
        <div className="quote__main">
          <h1 className={`quote__main_ticker quote__main_${ticker}`}>
            {ticker}
          </h1>
          <h2 className="quote__main_price">{price}</h2>
        </div>
        <div className="quote__change">
          <div
            className={`quote__change_percent quote__change_percent_${checkIsGrowing()}`}
          >
            {change_percent}
            {"%"}
          </div>
          <div className="quote__change_price">{change}</div>
        </div>
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
          </div>
          <div className="quote__more__settings_disable">Disable</div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
