import { Router } from 'express';
import { STATUS_CODE } from '../constants/http-code.constant';
import { USER_CONST } from '../constants/user.constant';
import { validateBodyDto } from '../utils';
import { createUserDto } from './dtos/create-user.dto';
import updateUserDto from './dtos/update-user.dto';
import userService from './user.service';

export const userRouter = Router();

userRouter.get('/list', async (req, res) => {
  const { loginSubstring, limit } = req.query as Record<string, string>;

  const users = await userService.getUsersSuggestions(loginSubstring, +limit);

  res.status(STATUS_CODE.SUCESSFULL).json(users);
});

userRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const user = await userService.findById(id);

  if (user) {
    res.json(user);
    return;
  }

  res.status(STATUS_CODE.NOT_FOUND).send(USER_CONST.NOT_FOUND);
});

userRouter.post('/', validateBodyDto(createUserDto), async (req, res) => {
  try {    
    const user = await userService.createUser(req.body);
    res.status(STATUS_CODE.CREATED).send(user);
  } catch (err) {
    res.status(STATUS_CODE.BAD_REQUEST).send();
  }
});

userRouter.patch('/:id', validateBodyDto(updateUserDto), async (req, res) => {
  const { id } = req.params;

  const updates = req.body;

  try {
    const updatedUser = await userService.updateUser(id, updates);
    res.status(STATUS_CODE.SUCESSFULL).json(updatedUser);
  } catch (err) {
    const { message } = err as Error;
    res.status(STATUS_CODE.BAD_REQUEST).json({ message });
  }
});

userRouter.delete('/:id', async (req, res) => {
  const { id } = req.params as Record<string, string>;

  console.log(id);

  try {
    const result = await userService.deleteUser(id);
    res.status(STATUS_CODE.SUCESSFULL).json(result);
  } catch (err) {
    const { message } = err as Error;
    res.status(STATUS_CODE.NOT_FOUND).json({ message });
  }
});
