import { Header } from "../../components/Header";
import { Quotes } from "../../components/Quotes";
import { Settings } from "../../components/Settings";

const Main = () => {
  return (
    <div className="main">
      <Header />
      <Settings />
      <Quotes />
    </div>
  );
};

export default Main;
