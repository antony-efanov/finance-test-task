import { useAppDispatch } from "../../hooks/useRedux";
import { setInterval } from "../../store/slices/Quotes/quotesSlice";

const Settings = () => {
  const dispatch = useAppDispatch();

  const onChangeInterval = (value: number) => {
    dispatch(setInterval(value));
  };

  return (
    <>
      <button onClick={() => onChangeInterval(2000)}>Change 2000</button>
      <button onClick={() => onChangeInterval(5000)}>Change 5000</button>
    </>
  );
};

export default Settings;
