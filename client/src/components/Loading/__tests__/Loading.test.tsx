import { render, screen } from "@testing-library/react";

import Loading from "../Loading";

describe("Loading component", () => {
  it("Should render loading component correctly", () => {
    render(<Loading />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
