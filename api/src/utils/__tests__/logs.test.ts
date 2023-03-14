import { Log } from "types/Log";
import { splitLogMessage } from "../logs";

describe("utils, splitLogMessage", () => {
  it("Should split log message", () => {
    const dataCases: Log[] = [
      {
        type: "W",
        timestamp: 10,
        text: "test",
      },
      {
        type: "E",
        severity: 10,
        text: "",
        timestamp: 20,
      },
      {
        type: "W",
        timestamp: 0,
        text: "test3",
      },
    ];

    dataCases.forEach((data) => {
      const severity = data.type === "E" ? `${data.severity} ` : "";
      const logMessage = `${data.type} ${severity}${data.timestamp} ${data.text}`;
      const splitLog = splitLogMessage(logMessage);

      Object.keys(data).forEach((key) =>
        expect(splitLog[key as keyof Log]).toBe(data[key as keyof Log])
      );
    });
  });
});
