import express, { Express } from "express";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import helmet from "helmet";

import { prefix } from "../config";
import routes from "../api/routes";
import errorController from "../api/controllers/error-controller";
import AppError from "../utils/appError";

export default (app: Express) => {
  process.on("uncaughtException", async (error) => {
    console.error(error.message, "Uncaught Exception");
  });

  app.use(cors({ origin: "http://localhost:3000" }));

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(helmet());

  app.use(express.static("public"));

  app.use(mongoSanitize());
  app.use(xss());

  app.use(prefix, routes);

  app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

  app.use(errorController);
};
