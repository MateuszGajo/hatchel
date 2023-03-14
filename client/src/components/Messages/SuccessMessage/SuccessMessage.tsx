import { Box, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import DoneIcon from "@mui/icons-material/Done";

import { MessageProps } from "../types";

const SuccessMessage = ({ message }: MessageProps) => (
  <Box
    alignItems="center"
    flexDirection="row"
    display="flex"
    color={green[500]}
  >
    <DoneIcon />
    <Typography component="p">{message}</Typography>
  </Box>
);

export default SuccessMessage;
