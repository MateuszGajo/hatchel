import { ERROR_LOG_REGEX, LOG_REGEX } from "../constants";

const validateLogMessage = (log: string) => LOG_REGEX.test(log);
const validateErrorLogMessage = (log: string) => ERROR_LOG_REGEX.test(log);

export const validateLogMessageRegex = (log: string) => {
  const type = log.split(" ")?.[0];

  switch (type) {
    case "E":
      return validateErrorLogMessage(log);
    case "I":
    case "W":
      return validateLogMessage(log);
    default:
      return false;
  }
};
