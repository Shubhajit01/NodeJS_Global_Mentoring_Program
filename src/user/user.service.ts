import { v4 as uuid } from "uuid";

import { User, UserDto } from "./user.model";

import { usersDB } from "../db/user.db";
import { USER_CONST } from "../constants/user.constant";

export const getUserById = (id: string): User | undefined => {
  return usersDB.find((user) => user.id === id);
};

export const createUser = (user: UserDto): User => {
  const dbUser = {
    ...user,
    id: uuid(),
    isDeleted: false,
  };

  usersDB.push(dbUser);

  return dbUser;
};

export const updateUser = (id: string, userUpdates: Partial<UserDto>): User => {
  const index = usersDB.findIndex((user) => user.id === id);

  if (index === -1) {
    throw new Error(USER_CONST.NOT_FOUND);
  }

  const user = usersDB[index];

  if (user.isDeleted) {
    throw new Error(USER_CONST.NOT_FOUND);
  }

  const updatedUser = {
    ...user,
    ...userUpdates,
  };

  usersDB[index] = updatedUser;

  return updatedUser;
};

export const getUsers = (substr = "", limit = Infinity): Array<User> => {
  const users: Array<User> = [];

  usersDB.some((user) => {
    if (!user.isDeleted && user.login.includes(substr)) {
      users.push(user);
    }
    return users.length === limit;
  });

  users.sort((user1, user2) => (user1.login > user2.login ? 1 : -1));

  return users;
};

export const deleteUserById = (id: string) => {
  const user = usersDB.find((user) => user.id === id);

  console.log(user);
  

  if (!user || user.isDeleted) {
    throw new Error(USER_CONST.NOT_FOUND);
  }

  user.isDeleted = true;

  return user;
};
