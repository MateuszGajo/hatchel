import supertest from "supertest";
import startServer from "../../server";
import mongoose from "mongoose";
import { CoreLog, ErrorLog } from "types/Log";

const app = startServer().listen();

const request = supertest(app);

afterAll((done) => {
  app.close();
  mongoose.connection.close();
  done();
});

beforeAll(() => {
  mongoose.connection.close();
});

describe("db connection", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  afterEach(() => {
    (console.error as jest.Mock).mockClear();
  });

  it("Should return 500 with apropriate status, test environment", async () => {
    process.env.NODE_ENV = "production";
    const res = await request.get("/api/logs");

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Something went very wrong!");
    expect(res.body.stack).toBe(undefined);
  });

  it("Should return 500 with apropriate status, dev environment", async () => {
    process.env.NODE_ENV = "development";
    const consoleMock = jest.spyOn(console, "error").mockImplementation();
    const res = await request.get("/api/logs");

    expect(res.status).toBe(500);
    expect(res.body.message).toBe(
      "Client must be connected before running operations"
    );
    expect(res.body.stack).not.toBe(undefined);
  });

  it("Should return 500 with apropriate status, production environment", async () => {
    process.env.NODE_ENV = "production";
    const res = await request.get("/api/logs");

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Something went very wrong!");
    expect(res.body.stack).toBe(undefined);
  });
});
