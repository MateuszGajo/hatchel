import getsLog from "../getLogs";
import { Request, Response } from "express";
import Log from "../../../../models/Log";
import AppError from "../../../../utils/appError";

jest.mock("../../../../utils/catchAsync");

jest
  .spyOn(Log, "find")
  .mockImplementationOnce(() => Promise.resolve([{}]) as any);

const REQ_MOCK = {} as unknown as Request;
const RES_MOCK = {
  status: jest.fn(),
} as unknown as Response;
const NEXT_MOCK = jest.fn();

describe("get logs controller", () => {
  it("Should validation fail", async () => {
    const next = jest.fn();
    let req = { query: { type: "G" } } as unknown as Request;

    await getsLog(req, RES_MOCK, next);
    expect(next).toHaveBeenCalledWith(new AppError("Log type is invalid", 400));

    req = { query: { timestamp: "G" } } as unknown as Request;

    await getsLog(req, RES_MOCK, next);
    expect(next).toHaveBeenCalledWith(
      new AppError("Log timestamp must be a number", 400)
    );
  });

  it("Should return success", async () => {
    const resJsonMock = jest.fn();
    const resStatusMock = jest.fn(() => ({
      json: resJsonMock,
    }));

    const res = {
      status: resStatusMock,
    } as unknown as Response;

    await getsLog(REQ_MOCK, res, NEXT_MOCK);

    expect(resStatusMock).toHaveBeenCalledWith(200);
    expect(resJsonMock).toHaveBeenCalledWith([{}]);
  });
});
