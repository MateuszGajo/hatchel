import { CoreLog, ErrorLog, LogFormData } from "../../types/Log";
import { splitLogMessage } from "../../utils/logs";
import schemaValidator from "../../utils/schemaValidator";
import {
  coreLogSchema,
  createLogSchema,
  logListParamsSchema,
  errorLogSchema,
} from "./schemas/logsSchemas";

const valiteErrorLog = (log: ErrorLog) => schemaValidator(errorLogSchema, log);

const validateCoreLog = (log: CoreLog) => schemaValidator(coreLogSchema, log);

export const validateLog = async (logText: string) => {
  const log = splitLogMessage(logText);

  switch (log.type) {
    case "E":
      return valiteErrorLog(log);
    default:
      return validateCoreLog(log);
  }
};

export const validateLogListParams = (
  params: Record<string, string | Record<string, string>>
) => schemaValidator(logListParamsSchema, params);

export const validateCreateLogData = (data: LogFormData) =>
  schemaValidator(createLogSchema, data);
