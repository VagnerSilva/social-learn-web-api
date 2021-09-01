import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../utils/base.repository';
import { UserDto } from './user.dto';
import { User } from './user.schema';

@Injectable()
export class UserRepository extends BaseRepository<User, UserDto> {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super(userModel);
  }

  async findByEmail(email: string): Promise<UserDto> {
    return await this.userModel.findOne({ email: email });
  }
}
