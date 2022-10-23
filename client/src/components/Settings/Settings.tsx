import { IntervalButton } from "./components/IntervalButton";

const Settings = () => {
  return (
    <div className="interval">
      <h1 className="interval__title">Update quotes every</h1>
      <div className="interval__buttons">
        <IntervalButton interval={2} />
        <IntervalButton interval={5} />
        <IntervalButton interval={10} />
        <IntervalButton interval={30} />
        <IntervalButton interval={60} />
      </div>
      <div className="interval__seconds">seconds.</div>
    </div>
  );
};

export default Settings;
