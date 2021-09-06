import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserRepository } from './user.repository';

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
    const isInvalid = await this.userRepository.findByEmail(newUser.email);
    if (isInvalid) {
      throw new HttpException('E-mail já cadastrado', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.insert(newUser);
    newUser['id'] = user._id;
    delete newUser.password;
    return newUser;
  }

  async findByEmail(email: string): Promise<UserDto> {
    return await this.userRepository.findByEmail(email);
  }
}
