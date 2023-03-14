import React from "react";
import useLoggerForm from "../../hooks/useLoggerForm";
import LoggerForm from "./LoggerForm";

const LoggerFormWrapper = () => {
  const logerFormData = useLoggerForm();

  return <LoggerForm {...logerFormData} />;
};

export default LoggerFormWrapper;
