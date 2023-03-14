import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Message from "../../../../components/Messages";
import { validateLogMessageRegex } from "../../utils/validation";
import { LogFormData } from "../../types";
import { useEffect } from "react";

const coreSchema = yup.object({
  name: yup.string().required("Name field is required"),
  email: yup
    .string()
    .required("Email field is required")
    .email("Email is invlid"),
  logMessage: yup
    .string()
    .required("Log field is required")
    .test(
      "Pattern check",
      `Choose one of the following pattern: 
      type (I or W) timestamp (number) message (text)
      type (E) severity (from 1 to 100) timestamp (number) message (text)`,
      (value) => validateLogMessageRegex(value)
    ),
});

export interface Props {
  formError: string;
  isLoading: boolean;
  onSubmit: (data: LogFormData) => void;
  formSuccessMessage: string;
}

const LoggerForm = ({
  formError,
  formSuccessMessage,
  onSubmit,
  isLoading,
}: Props) => {
  const {
    formState: { errors, isDirty, isValid },
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(coreSchema),
    defaultValues: {
      name: "",
      email: "",
      logMessage: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (!formSuccessMessage) return;
    reset();
  }, [formSuccessMessage]);

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} aria-label="form">
        <TextField
          {...register("name")}
          margin="normal"
          label="name"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          {...register("email")}
          margin="normal"
          label="email"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          {...register("logMessage")}
          sx={{
            whiteSpace: "pre",
          }}
          margin="normal"
          label="log"
          placeholder="log message"
          fullWidth
          error={!!errors.logMessage}
          helperText={errors.logMessage?.message}
          multiline
          rows={4}
        />
        <LoadingButton
          type="submit"
          loading={isLoading}
          disabled={!isDirty || !isValid}
        >
          Add
        </LoadingButton>
        <Message message={formSuccessMessage} type="Success" />
        <Message message={formError} type="Error" />
      </Box>
    </Container>
  );
};

export default LoggerForm;
