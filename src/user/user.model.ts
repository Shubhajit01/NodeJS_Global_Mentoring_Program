import Joi from "joi";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";

export type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

export type UserDto = Omit<User, "id" | "isDeleted">;

const schemaMap = {
  login: Joi.string().email().label("Please provide a proper email"),
  password: Joi.string().regex(/[A-Z0-9]+/i),
  age: Joi.number().min(4).max(130),
};

export const UserSchemaRequired = Joi.object(schemaMap).options({
  presence: "required",
});

export const UserSchemaOptional = Joi.object(schemaMap).options({
  presence: "optional",
});

export interface UserValidatedSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: UserDto;
}
