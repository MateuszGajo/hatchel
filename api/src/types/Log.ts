export enum LogType {
  I = "I",
  E = "E",
  W = "W",
}

export interface CoreLog {
  type: "I" | "W";
  timestamp: number;
  text: string;
}

export interface ErrorLog extends Omit<CoreLog, "type"> {
  type: "E";
  severity: number;
}

export type Log = ErrorLog | CoreLog;

export interface LogFilters {
  type: "severity";
}

export type LogFormData = {
  email: string;
  name: string;
  logMessage: string;
};
