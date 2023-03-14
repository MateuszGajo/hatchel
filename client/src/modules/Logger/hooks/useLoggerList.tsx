import { useState } from "react";
import agent from "../../../api/agent";
import useIsMounted from "../../../hooks/useIsMounted";
import { FilterListParams } from "../../../types/filtersParams";
import { getResponseErrorMessage } from "../../../utils/network";
import { Log } from "../types";

const useLoggerList = (filterParams?: FilterListParams) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isMounted = useIsMounted();

  const getLogs = async () => {
    try {
      setLoading(true);
      const resp = await agent.logger.get(filterParams);
      if (isMounted.current) setLogs(resp.data);
    } catch (err) {
      if (isMounted.current) setError(getResponseErrorMessage(err));
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  return {
    getLogs,
    logs,
    isLoading,
    error,
  };
};

export default useLoggerList;
