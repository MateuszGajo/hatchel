import axios from "axios";
import { render, screen, waitFor } from "@testing-library/react";
import DashBoard from "../DashBoard";
import { ErrorLog } from "../../../types";
import userEvent from "@testing-library/user-event";

const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("axios");

const MOCK_LOGS: ErrorLog[] = [
  {
    _id: "1",
    type: "E",
    severity: 10,
    text: "test",
    timestamp: 10,
  },
];

describe("Logger dashboard", () => {
  it("Should render with tabs", async () => {
    render(<DashBoard />);

    expect(screen.getByText("Relevent logs")).toBeInTheDocument();
    expect(screen.getByText("Form")).toBeInTheDocument();

    const errorParagraph = await screen.findByText(
      "Application error occured. Please contact system administrator"
    );

    expect(errorParagraph).toBeInTheDocument();
  });

  it("Should render relvent logs list by default", async () => {
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({ data: MOCK_LOGS }));
    render(<DashBoard />);

    const activeTabElement = screen.getByText("Relevent logs");
    expect(activeTabElement).toHaveAttribute("aria-selected", "true");

    const logData = MOCK_LOGS[0];
    const text = `${logData.type} ${logData.severity} ${logData.timestamp} ${logData.text}`;
    const listLog = await screen.findByText(text);

    expect(listLog).toBeInTheDocument();
  });

  it("Should render form after tabs change", async () => {
    render(<DashBoard />);

    const formTab = screen.getByText("Form");
    userEvent.click(formTab);
    expect(formTab).toHaveAttribute("aria-selected", "true");

    const formElement = await screen.findByRole("form");
    expect(formElement).toBeInTheDocument();
  });
});
