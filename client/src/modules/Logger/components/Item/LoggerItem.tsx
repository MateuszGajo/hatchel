import { Box, Typography } from "@mui/material";
import React from "react";
import { Log } from "../../types";

interface Props {
  log: Log;
}

const LoggerItem = ({ log }: Props) => {
  return (
    <Box>
      <Typography component="p">
        {log.type} {log.timestamp} {log.text}
      </Typography>
    </Box>
  );
};

export default LoggerItem;
