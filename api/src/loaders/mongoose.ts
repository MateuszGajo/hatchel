import mongoose from "mongoose";

import { dbUri } from "../config";

export default async () => {
  await mongoose
    .connect(dbUri)
    .then(() => {
      console.log("Mongodb Connection");
    })
    .catch((err) => {
      console.log("mongooo");
      throw new Error("MongoDb connection problem");
    });
};
