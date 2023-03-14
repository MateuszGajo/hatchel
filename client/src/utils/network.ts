import { AxiosError } from "axios";

export const getResponseErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    const statusCode = error.response?.status;
    if (!statusCode || statusCode >= 500)
      return "We have some problem with server. Please try again later.";

    return error.response?.data.message;
  }

  return "Application error occured. Please contact system administrator";
};
