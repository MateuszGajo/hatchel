import { AxiosError } from "axios";
import { getResponseErrorMessage } from "../network";

describe("network utils, get response error message", () => {
  it("Should return application error", () => {
    const error = new Error();
    const result = getResponseErrorMessage(error);

    expect(result).toBe(
      "Application error occured. Please contact system administrator"
    );
  });

  it("Should return network error", () => {
    let error = new AxiosError();
    let result = getResponseErrorMessage(error);

    expect(result).toBe(
      "We have some problem with server. Please try again later."
    );

    error = new AxiosError(undefined, undefined, undefined, undefined, {
      data: {},
      status: 500,
      statusText: "sds",
      headers: {},
      config: {} as any,
    });
    result = getResponseErrorMessage(error);

    expect(result).toBe(
      "We have some problem with server. Please try again later."
    );
  });

  it("Should return response error", () => {
    const responseMessage = "Invalid data";
    const error = new AxiosError(undefined, undefined, undefined, undefined, {
      data: {
        message: responseMessage,
      },
      status: 400,
      statusText: "sds",
      headers: {},
      config: {} as any,
    });
    const result = getResponseErrorMessage(error);

    expect(result).toBe(responseMessage);
  });
});
