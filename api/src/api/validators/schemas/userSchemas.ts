import * as yup from "yup";

export const userSchema = yup.object({
  email: yup.string().required("Email is required").email("Email is invalid"),
  name: yup.string().required("User name is required"),
});
