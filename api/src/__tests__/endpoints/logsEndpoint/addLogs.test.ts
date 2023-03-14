import supertest from "supertest";
import startServer from "../../../server";
import mongooseLoader from "../../../loaders/mongoose";
import Log from "../../../models/Log";
import mongoose from "mongoose";
import { CoreLog, ErrorLog } from "types/Log";

const app = startServer().listen();

const request = supertest(app);

afterAll((done) => {
  app.close();
  mongoose.connection.close();
  done();
});

describe("add logs endpoint", () => {
  it("Should add log", async () => {
    const coreLogData: CoreLog = {
      type: "W",
      timestamp: 10,
      text: "test",
    };

    const userData = {
      name: "name",
      email: "valid@email.pl",
    };

    const coreLogRes = await request.post("/api/logs/add").send({
      name: userData.name,
      email: userData.email,
      logMessage: `${coreLogData.type} ${coreLogData.timestamp} ${coreLogData.text}`,
    });

    expect(coreLogRes.status).toBe(200);
    expect(coreLogRes.body).toMatchObject(coreLogData);
    expect(coreLogRes.body.user).toMatchObject(userData);

    const errorLogData: ErrorLog = {
      type: "E",
      severity: 15,
      timestamp: 10,
      text: "test",
    };

    const errorLogRes = await request.post("/api/logs/add").send({
      name: userData.name,
      email: userData.email,
      logMessage: `${errorLogData.type} ${errorLogData.severity} ${errorLogData.timestamp} ${errorLogData.text}`,
    });

    expect(errorLogRes.status).toBe(200);
    expect(errorLogRes.body).toMatchObject(errorLogData);
    expect(errorLogRes.body.user).toMatchObject(userData);
  });
  it("Should request fail due to validation", async () => {
    const coreLogData: CoreLog = {
      type: "W",
      timestamp: 10,
      text: "test",
    };

    const userData = {
      name: "name",
      email: "valid@email.pl",
    };

    let res = await request.post("/api/logs/add").send({
      name: userData.name,
      email: userData.email,
      logMessage: `${coreLogData.type} ${coreLogData.text}`,
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Log should contain message");

    res = await request.post("/api/logs/add").send({
      name: "",
      email: userData.email,
      logMessage: `${coreLogData.type} ${coreLogData.text}`,
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Name is required");
  });
});
