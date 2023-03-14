import { render } from "@testing-library/react";
import SuccessMessage from "../SuccessMessage";

describe("Success message component", () => {
  it("Should render with all props", () => {
    const view = render(<SuccessMessage message="Success message" />);

    expect(view).toMatchSnapshot();
  });
});
