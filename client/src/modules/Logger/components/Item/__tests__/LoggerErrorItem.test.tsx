import { render } from "@testing-library/react";
import { ErrorLog } from "../../../types";
import LoggerErrorItem from "../LoggerErrorItem";

const MOCK_LOG: ErrorLog = {
  _id: "1",
  type: "E",
  severity: 5,
  text: "abcd",
  timestamp: 20,
};

describe("Logger error item component", () => {
  it("Should render with correct data", () => {
    const view = render(<LoggerErrorItem log={MOCK_LOG} />);

    expect(view).toMatchSnapshot();
  });
});
