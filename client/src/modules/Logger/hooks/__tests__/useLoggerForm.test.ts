import { act, renderHook, waitFor } from "@testing-library/react";
import useLoggerForm from "../useLoggerForm";
import axios from "axios";
import { LogFormData } from "../../types";

const MOCK_SUCCESS_MESSAGE_TIMEOUT = 100;

jest.mock("axios");
jest.mock("../../../../config", () => ({
  SUCCESS_MESSAGE_TIMEOUT: 100,
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

const FORM_DATA: LogFormData = {
  email: "valid@email.pl",
  name: "name",
  logMessage: "W 10 trsd",
};

describe("use logger form hook", () => {
  it("Should hook load with appropriate state", async () => {
    const { result } = renderHook(() => useLoggerForm());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.formError).toBe("");
    expect(result.current.formSuccessMessage).toBe("");
  });

  it("Should state act accordingly to request success", async () => {
    const { result } = renderHook(() => useLoggerForm());

    mockedAxios.post.mockImplementationOnce(
      async () =>
        new Promise((resolve, error) => {
          setTimeout(() => {
            resolve({ data: [] });
          }, 10);
        })
    );

    act(() => {
      result.current.onSubmit(FORM_DATA);
    });

    await waitFor(() => expect(result.current.isLoading).toBe(true));
    await waitFor(() =>
      expect(result.current.formSuccessMessage).toBe(
        "Log has been added successfully"
      )
    );
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await waitFor(() => expect(result.current.formSuccessMessage).toBe(""));
  });

  it("Should success message clear be cancel due to unmount", async () => {
    const { result, unmount } = renderHook(() => useLoggerForm());

    mockedAxios.post.mockImplementationOnce(
      async () =>
        new Promise((resolve, error) => {
          setTimeout(() => {
            resolve({ data: [] });
          }, 10);
        })
    );

    act(() => {
      result.current.onSubmit(FORM_DATA);
    });

    await waitFor(() =>
      expect(result.current.formSuccessMessage).toBe(
        "Log has been added successfully"
      )
    );
    unmount();
    await new Promise((r) => setTimeout(r, MOCK_SUCCESS_MESSAGE_TIMEOUT + 20));
    await waitFor(() => expect(result.current.formSuccessMessage).not.toBe(""));
  });

  it("Should cancel update state due unmount", async () => {
    const { result, unmount } = renderHook(() => useLoggerForm());

    const requestTime = 200;

    mockedAxios.post.mockImplementationOnce(
      async () =>
        new Promise((resolve, error) => {
          setTimeout(() => {
            error({ data: [] });
          }, requestTime);
        })
    );

    act(() => {
      result.current.onSubmit(FORM_DATA);
    });

    await waitFor(() => expect(result.current.isLoading).toBe(true));
    unmount();
    await new Promise((r) => setTimeout(r, requestTime + 10));
    await waitFor(() => expect(result.current.isLoading).toBe(true));
  });

  it("Should form request be made with correct data", async () => {
    const { result } = renderHook(() => useLoggerForm());

    mockedAxios.post.mockImplementationOnce(
      async () =>
        new Promise((resolve, error) => {
          setTimeout(() => {
            resolve({ data: [] });
          }, 10);
        })
    );

    act(() => {
      result.current.onSubmit(FORM_DATA);
    });

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith("logs/add", FORM_DATA)
    );
  });

  it("Should state act accordingly to request fail", async () => {
    const { result } = renderHook(() => useLoggerForm());

    mockedAxios.post.mockImplementationOnce(
      async () =>
        new Promise((resolve, error) => {
          setTimeout(() => {
            error({ data: [] });
          }, 10);
        })
    );

    act(() => {
      result.current.onSubmit(FORM_DATA);
    });

    await waitFor(() => expect(result.current.isLoading).toBe(true));
    await waitFor(() =>
      expect(result.current.formError).toBe(
        "Application error occured. Please contact system administrator"
      )
    );
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });
});
