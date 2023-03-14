import { Schema, ValidationError } from "yup";

const schemaValidator = async <T extends Schema, U>(
  schema: T,
  data: U
): Promise<string | null> => {
  try {
    await schema.validate(data);
  } catch (err) {
    if (err instanceof ValidationError) {
      return err.message;
    }
    return "unknown error";
  }

  return null;
};

export default schemaValidator;
