import addLog from "../addLog";
import { Request, Response } from "express";
import LogModel from "../../../../models/Log";
import AppError from "../../../../utils/appError";
import { Log } from "types/Log";
import User from "../../../../models/User";

jest.mock("../../../../utils/catchAsync");

jest
  .spyOn(LogModel, "find")
  .mockImplementationOnce(() => Promise.resolve([{}]) as any);

jest
  .spyOn(User, "findOne")
  .mockImplementationOnce(() => Promise.resolve(null) as any);

jest
  .spyOn(User, "create")
  .mockImplementationOnce((user) => Promise.resolve(user) as any);

jest
  .spyOn(LogModel, "create")
  .mockImplementationOnce((log) => Promise.resolve(log) as any);

const RES_MOCK = {
  status: jest.fn(),
} as unknown as Response;
const NEXT_MOCK = jest.fn();

describe("get logs controller", () => {
  it("Should validation fail", async () => {
    const next = jest.fn();
    let req = {
      body: { name: "name", email: "email@email.pl" },
    } as unknown as Request;

    await addLog(req, RES_MOCK, next);
    expect(next).toHaveBeenCalledWith(
      new AppError("Log message is required", 400)
    );
  });

  it("Should return success", async () => {
    const logMessage: Log = {
      type: "W",
      timestamp: 10,
      text: "text",
    };
    const user = {
      name: "abcd",
      email: "valid@valid.com",
    };
    const resJsonMock = jest.fn();
    const resStatusMock = jest.fn(() => ({
      json: resJsonMock,
    }));

    let req = {
      body: {
        ...user,
        logMessage: `${logMessage.type} ${logMessage.timestamp} ${logMessage.text}`,
      },
    } as unknown as Request;
    const res = {
      status: resStatusMock,
    } as unknown as Response;

    await addLog(req, res, NEXT_MOCK);

    expect(resStatusMock).toHaveBeenCalledWith(200);
    expect(resJsonMock).toHaveBeenCalledWith({ ...logMessage, user });
  });
});
