import supertest from "supertest";
import startServer from "../../../server";
import LogModel from "../../../models/Log";
import mongoose from "mongoose";
import { Log } from "types/Log";

const app = startServer().listen();

const request = supertest(app);

const log: Log = {
  type: "W",
  text: "abcd",
  timestamp: 10,
};

afterAll((done) => {
  app.close();
  mongoose.connection.close();
  done();
});

beforeAll(async () => {
  try {
    await LogModel.deleteMany({});
    await LogModel.create({
      type: log.type,
      text: log.text,
      timestamp: log.timestamp,
    });
  } catch (err) {}
});

describe("get logs endpoint", () => {
  it("should reutrn data", async () => {
    const res = await request.get("/api/logs");

    expect(res.body).toHaveLength(1);
    expect(res.status).toBe(200);
    expect(res.body[0].type).toBe(log.type);
    expect(res.body[0].text).toBe(log.text);
    expect(res.body[0].timestamp).toBe(log.timestamp);
  });

  it("should fail due validation", async () => {
    const res = await request.get("/api/logs?type=G");

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Log type is invalid");
  });
});
