import { FC } from "react";
import { IProps } from "./types";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useRedux";
import { setInterval } from "../../../../store/slices/Quotes/quotesSlice";

const IntervalButton: FC<IProps> = ({ interval }) => {
  const dispatch = useAppDispatch();
  const { interval: currentInterval } = useAppSelector((state) => state.quotes);

  const onChangeInterval = (value: number) => {
    dispatch(setInterval(value));
  };

  const isButtonChecked = () => {
    return currentInterval === interval * 1000 ? true : false;
  };

  return (
    <button
      className={
        isButtonChecked() ? "interval__button checked" : "interval__button"
      }
      onClick={() => onChangeInterval(interval * 1000)}
    >
      {interval}
    </button>
  );
};

export default IntervalButton;
