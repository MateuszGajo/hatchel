export enum LoggerTabs {
  LOG = "LOG",
  FORM = "FORM",
}

export interface CoreLog {
  _id: string;
  type: "I" | "W";
  timestamp: number;
  text: string;
}

export interface ErrorLog extends Omit<CoreLog, "type"> {
  type: "E";
  severity: number;
}

export type Log = ErrorLog | CoreLog;

export type LogFormData = {
  email: string;
  name: string;
  logMessage: string;
};
