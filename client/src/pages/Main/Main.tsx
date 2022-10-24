import { Favorites } from "../../components/Favorites";
import { Header } from "../../components/Header";
import { Quotes } from "../../components/Quotes";
import { Settings } from "../../components/Settings";

const Main = () => {
  return (
    <div className="main">
      <Header />
      <Quotes />
      <Favorites />
    </div>
  );
};

export default Main;
