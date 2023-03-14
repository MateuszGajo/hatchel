import express from "express";
import loader from "./loaders";

const startApp = () => {
  const app = express();

  loader(app);

  return app;
};

export default startApp;
