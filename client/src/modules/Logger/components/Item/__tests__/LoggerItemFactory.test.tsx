import { render, screen } from "@testing-library/react";
import { CoreLog, ErrorLog } from "../../../types";
import LoggerItemFactory from "../LoggerItemFactory";

const MOCK_LOG: CoreLog = {
  _id: "1",
  type: "W",
  text: "abcd",
  timestamp: 20,
};

describe("Logger item factory", () => {
  it("Should render with error item", () => {
    const log: ErrorLog = {
      ...MOCK_LOG,
      type: "E",
      severity: 15,
    };

    const text = `${log.type} ${log.severity} ${log.timestamp} ${log.text}`;
    render(<LoggerItemFactory log={log} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("Should render with default item", () => {
    let log: CoreLog = {
      ...MOCK_LOG,
    };

    const text = `${log.type} ${log.timestamp} ${log.text}`;
    const { rerender } = render(<LoggerItemFactory log={log} />);

    expect(screen.getByText(text)).toBeInTheDocument();

    log = {
      ...log,
      type: "I",
    };
    rerender(<LoggerItemFactory log={MOCK_LOG} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
