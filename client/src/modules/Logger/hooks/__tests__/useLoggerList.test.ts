import { act, renderHook, waitFor } from "@testing-library/react";
import useLoggerList from "../useLoggerList";
import axios from "axios";
import { ErrorLog, Log, LogFormData } from "../../types";
import { FilterListParams } from "../../../../types/filtersParams";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const FILTER_PARAMS: FilterListParams<Log> = {
  type: "E",
  severity: {
    type: "gte",
    value: 50,
  },
};

const MOCK_LOGS: ErrorLog[] = [
  {
    _id: "1",
    type: "E",
    severity: 10,
    text: "test",
    timestamp: 10,
  },
];

afterEach(() => jest.clearAllMocks());

describe("use logger form hook", () => {
  it("Should hook load with appropriate state", async () => {
    const { result } = renderHook(() => useLoggerList());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe("");
    expect(result.current.logs).toHaveLength(0);
  });

  it("Should state act accordingly to request success", async () => {
    const { result } = renderHook(() => useLoggerList());

    mockedAxios.get.mockImplementationOnce(
      async () =>
        new Promise((resolve, error) => {
          setTimeout(() => {
            resolve({ data: MOCK_LOGS });
          }, 10);
        })
    );

    act(() => {
      result.current.getLogs();
    });

    await waitFor(() => expect(result.current.logs).toHaveLength(1));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it("Should state act accordingly to request fail", async () => {
    const { result } = renderHook(() => useLoggerList());

    mockedAxios.get.mockImplementationOnce(
      async () =>
        new Promise((resolve, error) => {
          setTimeout(() => {
            error({ data: MOCK_LOGS });
          }, 10);
        })
    );

    act(() => {
      result.current.getLogs();
    });

    await waitFor(() => expect(result.current.logs).toHaveLength(0));
    await waitFor(() =>
      expect(result.current.error).toBe(
        "Application error occured. Please contact system administrator"
      )
    );
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it("Should get request be made with correct data", async () => {
    const { result } = renderHook(() => useLoggerList(FILTER_PARAMS));

    mockedAxios.get.mockImplementationOnce(
      async () =>
        new Promise((resolve, error) => {
          setTimeout(() => {
            resolve({ data: MOCK_LOGS });
          }, 10);
        })
    );

    act(() => {
      result.current.getLogs();
    });
    await waitFor(() =>
      expect(axios.get).toHaveBeenCalledWith("logs?type=E&severity[gte]=50")
    );
  });

  it("Should cancel success request update state due unmount", async () => {
    const { result, unmount } = renderHook(() => useLoggerList());

    const requestTime = 200;

    mockedAxios.get.mockImplementationOnce(
      async () =>
        new Promise((resolve, error) => {
          setTimeout(() => {
            resolve({ data: MOCK_LOGS });
          }, requestTime);
        })
    );

    act(() => {
      result.current.getLogs();
    });

    await waitFor(() => expect(result.current.isLoading).toBe(true));
    unmount();
    await new Promise((r) => setTimeout(r, requestTime + 10));
    await waitFor(() => expect(result.current.isLoading).toBe(true));
  });

  it("Should cancel fail request update state due unmount", async () => {
    const { result, unmount } = renderHook(() => useLoggerList());

    const requestTime = 200;

    mockedAxios.get.mockImplementationOnce(
      async () =>
        new Promise((resolve, error) => {
          setTimeout(() => {
            error({ data: MOCK_LOGS });
          }, requestTime);
        })
    );

    act(() => {
      result.current.getLogs();
    });

    await waitFor(() => expect(result.current.isLoading).toBe(true));
    unmount();
    await new Promise((r) => setTimeout(r, requestTime + 10));
    await waitFor(() => expect(result.current.isLoading).toBe(true));
  });
});
