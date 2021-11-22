import { Like } from 'typeorm';
import { createUserDto } from './dtos/create-user.dto';
import updateUserDto from './dtos/update-user.dto';
import { User } from './user.entity';

export class UserRepository {
  constructor() {}

  async findById(id: string) {
    return User.findOne({
      where: {
        isDeleted: false,
        id,
      },
    });
  }

  async getUsers(limit?: number) {
    return User.find({
      take: limit,
      where: {
        isDeleted: false,
      },
    });
  }

  async filterUser(keyword: string, limit?: number) {
    return User.find({
      where: {
        login: Like(`%${keyword}%`),
        isDeleted: false,
      },
      select: ['id', 'login', 'age'],
      take: limit,
      order: {
        login: 'ASC',
      },
    });
  }

  async createUser(userDto: createUserDto) {  
    const user = new User();
    user.login = userDto.login;
    user.password = userDto.password;
    user.age = userDto.age;
    return user.save();
  }

  async updateUser(id: string, details: updateUserDto) {
    return User.update({ id }, details);
  }

  async deleteUser(id: string) {
    return User.update({ id }, { isDeleted: true });
  }
}

export default new UserRepository();
