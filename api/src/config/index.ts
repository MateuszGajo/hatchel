export { default as swaggerConfig } from "./swagger.config";
import { config } from "dotenv";
config();

const { PORT, DB_URI, NODE_ENV } = process.env;

const database = NODE_ENV === "test" ? "test" : "db";

export const port = PORT || 5000;
export const specs = "/docs";
export const prefix = "/api";
export const dbUri = (DB_URI || "") + "/" + database;
