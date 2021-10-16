import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(id: string): Promise<UserDto> {
    return await this.userRepository.findById(id);
  }

  async update(id: string, user: UserDto): Promise<UserDto> {
    return await this.userRepository.findByIdAndUpdate({ _id: id }, user);
  }

  async createUser(newUser: UserDto): Promise<UserDto> {
    const isInvalid = await this.userRepository.findByUsername(newUser.name);
    if (isInvalid) {
      throw new HttpException('Username já cadastrado', HttpStatus.BAD_REQUEST);
    }
    const user = (await this.userRepository.insert(newUser)) as User;

    delete newUser.password;
    newUser['id'] = user._id;
    return newUser;
  }

  async findByEmail(email: string): Promise<UserDto> {
    return await this.userRepository.findByEmail(email);
  }

  async findByUsername(username: string): Promise<UserDto> {
    return await this.userRepository.findByUsername(username);
  }

  async changePassword(
    id: string,
    password: string,
    newPassword: string
  ): Promise<string> {
    const user = await this.userRepository.findById(id);
    const isMatch = await user['comparePassword'](password);
    if (!isMatch) {
      throw new HttpException('Senha invalida', HttpStatus.BAD_REQUEST);
    }
    user.password = newPassword;
    user.recoverToken = null;
    await user.save();

    return 'Senha alterada com sucesso.';
  }
}
