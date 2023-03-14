import Message from "..";
import { render, screen } from "@testing-library/react";
import DefaultMessage from "../DefaultMessage/DefaultMessage";

jest.mock("../DefaultMessage/DefaultMessage");

describe("Test message component", () => {
  it("Should error message be render", async () => {
    render(<Message type="Error" message="Error message" />);

    expect(screen.getByTestId("PriorityHighIcon")).toBeInTheDocument();
    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  it("Should success message be render", () => {
    render(<Message type="Success" message="Success message" />);

    expect(screen.getByTestId("DoneIcon")).toBeInTheDocument();
    expect(screen.getByText("Success message")).toBeInTheDocument();
  });

  it("Should default message be render", () => {
    render(<Message message="Default message" />);

    expect(DefaultMessage).toHaveBeenCalled();
  });

  it("Should render empty", () => {
    render(<Message message="" />);

    expect(screen.queryByRole("paragraph")).not.toBeInTheDocument();
  });
});
