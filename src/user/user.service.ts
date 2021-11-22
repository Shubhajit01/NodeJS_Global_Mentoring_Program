import { createUserDto } from './dtos/create-user.dto';
import updateUserDto from './dtos/update-user.dto';
import { User } from './user.entity';
import userRepository, { UserRepository } from './user.repository';

class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findById(id: string): Promise<User | undefined> {
    return this.userRepository.findById(id);
  }

  getUsersSuggestions(loginSub: string, limit?: number) {
    return this.userRepository.filterUser(loginSub, limit);
  }

  async createUser(user: createUserDto) {
    const { password, isDeleted, ...dbUser } =
      await this.userRepository.createUser(user);
    return dbUser;
  }

  async updateUser(id: string, details: updateUserDto) {
    const result = await this.userRepository.updateUser(id, details);
    return result.generatedMaps;
  }
  
  async deleteUser(id: string) {
    const result = await this.userRepository.deleteUser(id);
    return result.generatedMaps;
  }
}

export default new UserService(userRepository);
