import { Express } from "express";
import mongooseLoader from "./mongoose";
import expressLoader from "./express";

export default (app: Express) => {
  expressLoader(app);
  mongooseLoader();
};
