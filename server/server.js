"use strict";
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const io = require("socket.io");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

app.use(cors());

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});

const socketServer = io(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

const tickers = [
  "AAPL", // Apple
  "GOOGL", // Alphabet
  "MSFT", // Microsoft
  "AMZN", // Amazon
  "FB", // Facebook
  "TSLA", // Tesla
];

const randomValue = (min = 0, max = 1, precision = 0) => {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
};

const utcDate = () => {
  const isZeroNeeded = (date) => {
    return date < 10 ? `0${date}` : date;
  };

  const now = new Date();

  const hours = isZeroNeeded(now.getHours());
  const minutes = isZeroNeeded(now.getMinutes());

  const day = isZeroNeeded(now.getDate());
  const month = isZeroNeeded(now.getMonth());
  const year = now.getFullYear();

  return `${hours}:${minutes} ${day}.${month}.${year}`;
};

const getQuotes = (socket) => {
  const quotes = tickers.map((ticker) => ({
    ticker,
    exchange: "NASDAQ",
    price: randomValue(100, 300, 2),
    change: randomValue(100, 200, 2),
    change_percent: randomValue(1, -1, 2),
    dividend: randomValue(0, 1, 2),
    profit: randomValue(0, 2, 2),
    last_trade_time: utcDate(),
  }));

  socket.emit("ticker", quotes);
};

const trackTickers = (socket, interval = 5000) => {
  const fetchInterval = interval;

  // first quotes
  getQuotes(socket);

  // update N seconds
  const timer = setInterval(() => {
    getQuotes(socket);
  }, fetchInterval);

  socket.on("disconnect", () => {
    clearInterval(timer);
  });

  socket.on("changeInterval", () => {
    clearInterval(timer);
  });
};

socketServer.on("connection", (socket) => {
  socket.on("start", () => {
    trackTickers(socket);
  });

  socket.on("changeInterval", (value) => {
    trackTickers(socket, value);
  });
});
