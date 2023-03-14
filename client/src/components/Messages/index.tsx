import React from "react";
import DefaultMessage from "./DefaultMessage/DefaultMessage";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import SuccessMessage from "./SuccessMessage/SuccessMessage";
import { MessageProps } from "./types";

interface Props extends MessageProps {
  type?: "Error" | "Success";
}

const Message = ({ type, message }: Props) => {
  if (!message) return null;

  switch (type) {
    case "Error":
      return <ErrorMessage message={message} />;
    case "Success":
      return <SuccessMessage message={message} />;
    default:
      return <DefaultMessage message={message} />;
  }
};

export default Message;
