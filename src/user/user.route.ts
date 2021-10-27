import { Router } from "express";
import { createValidator, ValidatedRequest } from "express-joi-validation";
import { STATUS_CODE } from "../constants/http-code.constant";
import { USER_CONST } from "../constants/user.constant";
import {
  UserSchemaOptional,
  UserSchemaRequired,
  UserValidatedSchema,
} from "./user.model";
import {
  createUser,
  getUserById,
  updateUser,
  getUsers,
  deleteUserById,
} from "./user.service";

export const userRouter = Router();

const validator = createValidator();

userRouter.get("/list", (req, res) => {
  const { loginSubstring, limit } = req.query as Record<string, string>;

  const users = getUsers(loginSubstring, +limit);

  res.status(STATUS_CODE.SUCESSFULL).json(users);
});

userRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  const user = getUserById(id);

  if (!user?.isDeleted) {
    res.status(STATUS_CODE.SUCESSFULL).send(user);
  } else {
    res.status(STATUS_CODE.NOT_FOUND).send(USER_CONST.NOT_FOUND);
  }
});

userRouter.post(
  "/",
  validator.body(UserSchemaRequired),
  (req: ValidatedRequest<UserValidatedSchema>, res) => {
    const user = req.body;

    const { password, isDeleted, ...dbUser } = createUser(user);

    res.status(STATUS_CODE.CREATED).send(dbUser);
  }
);

userRouter.patch(
  "/:id",
  validator.body(UserSchemaOptional),
  (req: ValidatedRequest<UserValidatedSchema>, res) => {
    const { id } = req.params;

    const updates = req.body;

    try {
      const updatedUser = updateUser(id, updates);
      const { isDeleted, password, ...user } = updatedUser;
      res.status(STATUS_CODE.SUCESSFULL).json(user);
    } catch (err) {
      const { message } = err as Error;
      res.status(STATUS_CODE.BAD_REQUEST).json({ message });
    }
  }
);

userRouter.delete("/:id", (req, res) => {
  const { id } = req.params as Record<string, string>;

  console.log(id);

  try {
    const { isDeleted, password, ...user } = deleteUserById(id);
    res.status(STATUS_CODE.SUCESSFULL).json(user);
  } catch (err) {
    const { message } = err as Error;
    res.status(STATUS_CODE.NOT_FOUND).json({ message });
  }
});
