import { render, screen } from "@testing-library/react";
import LoggerList from "../LoggerList";
import { Log } from "../../../types";

const MOCK_LOGS_DATA: Log[] = [
  {
    _id: "1",
    type: "W",
    text: "test",
    timestamp: 10,
  },
];

describe("Logger list wrapper component", () => {
  it("Should render data", () => {
    render(<LoggerList logs={MOCK_LOGS_DATA} />);

    const logData = MOCK_LOGS_DATA[0];
    const text = `${logData.type} ${logData.timestamp} ${logData.text}`;

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
