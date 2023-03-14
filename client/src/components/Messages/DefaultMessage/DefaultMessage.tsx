import { Typography } from "@mui/material";

import { MessageProps } from "../types";

const DefaultMessage = ({ message }: MessageProps) => (
  <Typography component="p">{message}</Typography>
);

export default DefaultMessage;
