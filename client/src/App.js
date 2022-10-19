import "./App.css";
import { io } from "socket.io-client";
import { useState } from "react";

const socket = io("http://localhost:4000", {
  autoConnect: true,
  forceNew: true,
  reconnection: true,
  transports: ["websocket", "polling"],
});

const App = () => {
  const [prices, setPrices] = useState([]);

  socket.on("connect", () => {
    console.log(socket.id);
    socket.emit("start");
  });

  socket.on("ticker", (quotes) => {
    setPrices(quotes);
  });

  return (
    <div className="App">
      {prices.map((e, i) => {
        return (
          <>
            <h1>{e.ticker}</h1>
            <h2>{e.price}</h2>
          </>
        );
      })}
    </div>
  );
};

export default App;
