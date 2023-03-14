import { Box } from "@mui/material";
import LoggerItemFactory from "../Item/LoggerItemFactory";
import { Log } from "../../types";

interface Props {
  logs: Log[];
}

const LoggerList = ({ logs }: Props) => (
  <Box>
    {logs.map((log) => (
      <LoggerItemFactory log={log} key={log._id} />
    ))}
  </Box>
);
export default LoggerList;
