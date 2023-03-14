import schemaValidator from "../../utils/schemaValidator";
import { User } from "../../types/User";
import { userSchema } from "./schemas/userSchemas";

export const validateUser = (user: User) => schemaValidator(userSchema, user);
