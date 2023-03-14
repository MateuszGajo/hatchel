import { Box, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

import { MessageProps } from "../types";

const ErrorMessage = ({ message }: MessageProps) => (
  <Box alignItems="center" flexDirection="row" display="flex" color={red[400]}>
    <PriorityHighIcon />
    <Typography component="p">{message}</Typography>
  </Box>
);

export default ErrorMessage;
