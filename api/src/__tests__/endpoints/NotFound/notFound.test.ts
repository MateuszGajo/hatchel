import supertest from "supertest";
import startServer from "../../../server";
import mongoose from "mongoose";

const app = startServer().listen();

const request = supertest(app);

afterAll((done) => {
  app.close();
  mongoose.connection.close();
  done();
});

describe("not found endpoint", () => {
  it("Should return error", async () => {
    const res = await request.get("/api/lff");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Can't find /api/lff on this server!");
  });
});
