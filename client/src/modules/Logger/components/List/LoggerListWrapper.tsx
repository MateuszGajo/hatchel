import { useEffect } from "react";

import Loading from "../../../../components/Loading/Loading";
import Message from "../../../../components/Messages";
import { FilterListParams } from "../../../../types/filtersParams";
import useLoggerList from "../../hooks/useLoggerList";
import { Log } from "../../types";
import LoggerList from "./LoggerList";

const FILTER_PARAMS: FilterListParams<Log> = {
  type: "E",
  severity: {
    type: "gte",
    value: 50,
  },
};

const LoggerListWrapper = () => {
  const { getLogs, logs, isLoading, error } = useLoggerList(FILTER_PARAMS);

  useEffect(() => {
    getLogs();
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <Message type="Error" message={error} />;
  if (!logs.length) return <Message message="List is empty" />;

  return <LoggerList logs={logs} />;
};

export default LoggerListWrapper;
