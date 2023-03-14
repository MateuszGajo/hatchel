import { render, screen } from "@testing-library/react";
import LoggerFormWrapper from "../LoggerFormWrapper";

describe("Logger form wrapper", () => {
  it("Should render form", async () => {
    render(<LoggerFormWrapper />);

    const formElement = screen.getByRole("form");
    expect(formElement).toBeInTheDocument();
  });
});
