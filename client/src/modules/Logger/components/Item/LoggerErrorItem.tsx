import { Box, Typography } from "@mui/material";
import { ErrorLog } from "../../types";

interface Props {
  log: ErrorLog;
}

const LoggerErrorItem = ({ log }: Props) => {
  return (
    <Box>
      <Typography component="p" fontFamily="monospace">
        {log.type} {log.severity} {log.timestamp} {log.text}
      </Typography>
    </Box>
  );
};

export default LoggerErrorItem;
