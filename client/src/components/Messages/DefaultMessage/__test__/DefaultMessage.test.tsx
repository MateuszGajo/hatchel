import { render } from "@testing-library/react";
import DefaultMessage from "../DefaultMessage";

describe("Default message component", () => {
  it("Should render with all props", () => {
    const view = render(<DefaultMessage message="Default message" />);

    expect(view).toMatchSnapshot();
  });
});
