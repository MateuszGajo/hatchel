import { render, screen } from "@testing-library/react";
import axios from "axios";
import App from "../App";
import { ErrorLog } from "../modules/Logger/types";

const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("axios");

const MOCK_LOGS: ErrorLog[] = [
  {
    _id: "1",
    type: "E",
    severity: 10,
    text: "test",
    timestamp: 10,
  },
];

test("Should render root app without error", async () => {
  mockedAxios.get.mockReturnValueOnce(Promise.resolve({ data: MOCK_LOGS }));
  render(<App />);

  const logData = MOCK_LOGS[0];
  const text = `${logData.type} ${logData.severity} ${logData.timestamp} ${logData.text}`;
  const listLog = await screen.findByText(text);

  expect(listLog).toBeInTheDocument();
});
