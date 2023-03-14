import { render } from "@testing-library/react";
import ErrorMessage from "../ErrorMessage";

describe("Error message component", () => {
  it("Should render with all props", () => {
    const view = render(<ErrorMessage message="Error message" />);

    expect(view).toMatchSnapshot();
  });
});
