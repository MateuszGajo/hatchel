import LoggerErrorItem from "./LoggerErrorItem";
import LoggerItem from "./LoggerItem";
import { Log } from "../../types";

interface Props {
  log: Log;
}

const LoggerItemFactory = ({ log }: Props) => {
  switch (log.type) {
    case "E":
      return <LoggerErrorItem log={log} />;
    case "W":
    case "I":
    default:
      return <LoggerItem log={log} />;
  }
};

export default LoggerItemFactory;
