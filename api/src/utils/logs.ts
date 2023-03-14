import { CoreLog, ErrorLog, Log } from "../types/Log";

const splitCoreMessage = (log: string): CoreLog => {
  const [type, timestamp, text] = log.split(" ");

  return {
    type: type as CoreLog["type"],
    timestamp: Number(timestamp),
    text,
  };
};

const splitErrorMessage = (log: string): ErrorLog => {
  const [type, severity, timestamp, text] = log.split(" ");

  return {
    type: type as ErrorLog["type"],
    severity: Number(severity),
    timestamp: Number(timestamp),
    text,
  };
};

export const splitLogMessage = (log: string): Log => {
  const logType = log.split(" ")[0] as Log["type"];

  switch (logType) {
    case "E":
      return splitErrorMessage(log);
    default:
      return splitCoreMessage(log);
  }
};
