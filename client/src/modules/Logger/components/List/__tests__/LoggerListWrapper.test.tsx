import { render, screen } from "@testing-library/react";
import LoggerListWrapper from "../LoggerListWrapper";
import useLoggerList from "../../../hooks/useLoggerList";
import { ErrorLog } from "../../../types";

jest.mock("../../../hooks/UseLoggerList");

const mockUseLoggerList = useLoggerList as jest.MockedFunction<
  typeof useLoggerList
>;

const MOCK_USE_LOGGER_LIST_DATA = {
  isLoading: false,
  logs: [],
  error: "",
  getLogs: () => Promise.resolve(),
};

const MOCK_LOGS_DATA: ErrorLog[] = [
  {
    _id: "1",
    type: "E",
    severity: 10,
    text: "test",
    timestamp: 10,
  },
];

describe("Logger list wrapper component", () => {
  it("Should render loading component", () => {
    const useLoggerListData = {
      ...MOCK_USE_LOGGER_LIST_DATA,
      isLoading: true,
    };
    mockUseLoggerList.mockReturnValue(useLoggerListData);

    render(<LoggerListWrapper />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("Should render error message", () => {
    const useLoggerListData = {
      ...MOCK_USE_LOGGER_LIST_DATA,
      error: "Server error occured. Please contact adminstrator.",
    };
    mockUseLoggerList.mockReturnValue(useLoggerListData);

    render(<LoggerListWrapper />);

    expect(screen.getByText(useLoggerListData.error)).toBeInTheDocument();
  });

  it("Should render empty list message", () => {
    const useLoggerListData = {
      ...MOCK_USE_LOGGER_LIST_DATA,
    };
    mockUseLoggerList.mockReturnValue(useLoggerListData);

    render(<LoggerListWrapper />);

    expect(screen.getByText("List is empty")).toBeInTheDocument();
  });

  it("Should render data", () => {
    const useLoggerListData = {
      ...MOCK_USE_LOGGER_LIST_DATA,
      logs: MOCK_LOGS_DATA,
    };
    mockUseLoggerList.mockReturnValue(useLoggerListData);
    const logData = MOCK_LOGS_DATA[0];
    const text = `${logData.type} ${logData.severity} ${logData.timestamp} ${logData.text}`;

    render(<LoggerListWrapper />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("Should get data function be called", () => {
    const useLoggerListData = {
      ...MOCK_USE_LOGGER_LIST_DATA,
      getLogs: jest.fn(),
    };
    mockUseLoggerList.mockReturnValue(useLoggerListData);

    render(<LoggerListWrapper />);

    expect(useLoggerListData.getLogs).toHaveBeenCalledTimes(1);
  });
});
