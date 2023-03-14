import * as yup from "yup";
import { LogType } from "../../../types/Log";

export const coreLogSchema = yup.object({
  type: yup
    .mixed()
    .required("Log type is required")
    .oneOf(["I", "W"], "Log type is invalid"),
  timestamp: yup
    .number()
    .test((value) => (value ? /^-?\d+$/.test(String(value)) : true))
    .typeError("Log timestamp must be a number"),
  text: yup.string().required("Log should contain message"),
});

export const errorLogSchema = coreLogSchema.concat(
  yup.object({
    type: yup
      .mixed()
      .required("Type is required")
      .oneOf(["E"], "Log type is invalid"),
    serverity: yup
      .number()
      .min(1, "Log serverity must be at least 1")
      .max(100, "Log severity must be below 100"),
  })
);

export const logListParamsSchema = yup.object({
  type: yup.mixed().oneOf([...Object.keys(LogType)], "Log type is invalid"),
  severity: yup.lazy((value) => {
    switch (typeof value) {
      case "object":
        return yup.object().required("Comparison operator is required");
      default:
        return yup
          .number()
          .test((value) => (value ? /^-?\d+$/.test(String(value)) : true))
          .typeError("Log severity must be a number")
          .min(1, "Log serverity must be at least 1")
          .max(100, "Log severity must be lower equal than 100");
    }
  }),
  timestamp: yup.lazy((value) => {
    switch (typeof value) {
      case "object":
        return yup.object().required("Comparison operator is required");
      default:
        return yup
          .number()
          .test((value) => (value ? /^-?\d+$/.test(String(value)) : true))
          .typeError("Log timestamp must be a number");
    }
  }),
});

export const createLogSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  logMessage: yup.string().required("Log message is required"),
});
