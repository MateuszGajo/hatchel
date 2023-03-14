import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LogFormData } from "../../../types";
import LoggerForm, { Props as LoggerFormProps } from "../LoggerForm";

const MOCK_DATA: LoggerFormProps = {
  isLoading: false,
  onSubmit: (data: LogFormData) => {},
  formError: "",
  formSuccessMessage: "",
};

describe("Logger form wrapper", () => {
  it("Should render form", async () => {
    const data: LoggerFormProps = {
      ...MOCK_DATA,
    };
    render(<LoggerForm {...data} />);

    const formElement = screen.getByRole("form");
    expect(formElement).toBeInTheDocument();
  });

  it("Should render loading component", async () => {
    const data: LoggerFormProps = {
      ...MOCK_DATA,
      isLoading: true,
    };
    render(<LoggerForm {...data} />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("Should form be invalid", async () => {
    const data: LoggerFormProps = {
      ...MOCK_DATA,
    };
    render(<LoggerForm {...data} />);

    const formData: LogFormData = {
      name: "1",
      email: "2",
      logMessage: "3",
    };

    const nameInput = screen.getByRole("textbox", { name: "name" });
    const emailInput = screen.getByRole("textbox", { name: "email" });
    const logMessageInput = screen.getByRole("textbox", { name: "log" });

    userEvent.type(nameInput, formData.name);
    userEvent.type(emailInput, formData.email);
    userEvent.type(logMessageInput, formData.logMessage);

    expect(nameInput).toHaveValue(formData.name);
    expect(emailInput).toHaveValue(formData.email);
    expect(logMessageInput).toHaveValue(formData.logMessage);

    userEvent.clear(nameInput);

    const emailValidationError = await screen.findByText("Email is invlid");
    const nameValidatorError = await screen.findByText(
      "Name field is required"
    );
    const logMessageValidationError = await screen.findByText(
      /Choose one of the following pattern:/
    );
    expect(emailValidationError).toBeInTheDocument();
    expect(logMessageValidationError).toBeInTheDocument();
    expect(nameValidatorError).toBeInTheDocument();

    const submitButton = screen.getByText("Add");

    expect(submitButton).toHaveAttribute("disabled");
  });

  it("Should form pass", async () => {
    const data: LoggerFormProps = {
      ...MOCK_DATA,
      onSubmit: jest.fn(),
    };
    render(<LoggerForm {...data} />);

    const formData: LogFormData = {
      name: "name",
      email: "valid@email.com",
      logMessage: "W 10 test",
    };

    const nameInput = screen.getByRole("textbox", { name: "name" });
    const emailInput = screen.getByRole("textbox", { name: "email" });
    const logMessageInput = screen.getByRole("textbox", { name: "log" });

    userEvent.type(nameInput, formData.name);
    userEvent.type(emailInput, formData.email);
    userEvent.type(logMessageInput, formData.logMessage);

    expect(nameInput).toHaveValue(formData.name);
    expect(emailInput).toHaveValue(formData.email);
    expect(logMessageInput).toHaveValue(formData.logMessage);

    const submitButton = screen.getByText("Add");

    await waitFor(() => expect(submitButton).not.toHaveAttribute("disabled"));

    userEvent.click(submitButton);

    await waitFor(() => expect(data.onSubmit).toHaveBeenCalledTimes(1));
  });

  it("Should render error message", async () => {
    const data: LoggerFormProps = {
      ...MOCK_DATA,
      formError: "Error message",
    };
    render(<LoggerForm {...data} />);

    expect(screen.getByText(data.formError)).toBeInTheDocument();
  });

  it("Should render success message", async () => {
    const data: LoggerFormProps = {
      ...MOCK_DATA,
      formSuccessMessage: "Success message",
    };
    render(<LoggerForm {...data} />);

    expect(screen.getByText(data.formSuccessMessage)).toBeInTheDocument();
  });
});
