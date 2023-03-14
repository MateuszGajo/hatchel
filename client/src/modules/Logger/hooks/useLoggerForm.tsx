import { useEffect, useState } from "react";
import agent from "../../../api/agent";
import { SUCCESS_MESSAGE_TIMEOUT } from "../../../config";
import useIsMounted from "../../../hooks/useIsMounted";
import { getResponseErrorMessage } from "../../../utils/network";
import { LogFormData } from "../types";

const useLoggerForm = () => {
  const [formError, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [formSuccessMessage, setSuccessMessage] = useState("");
  const isMounted = useIsMounted();

  useEffect(() => {
    if (!formSuccessMessage) return;

    const timeoutId = setTimeout(
      () => setSuccessMessage(""),
      SUCCESS_MESSAGE_TIMEOUT
    );

    return () => clearTimeout(timeoutId);
  }, [formSuccessMessage]);

  const onSubmit = async (data: LogFormData) => {
    try {
      setLoading(true);
      await agent.logger.add(data);
      setSuccessMessage("Log has been added successfully");
    } catch (err) {
      if (isMounted.current) setError(getResponseErrorMessage(err));
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  return {
    formError,
    onSubmit,
    isLoading,
    formSuccessMessage,
  };
};

export default useLoggerForm;
