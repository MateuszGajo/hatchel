import { render } from "@testing-library/react";
import { CoreLog } from "../../../types";
import LoggerItem from "../LoggerItem";

const MOCK_LOG: CoreLog = {
  _id: "1",
  type: "W",
  text: "abcd",
  timestamp: 20,
};

describe("Logger error item component", () => {
  it("Should render with correct data", () => {
    const view = render(<LoggerItem log={MOCK_LOG} />);

    expect(view).toMatchSnapshot();
  });
});
