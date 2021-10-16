import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../utils/base.repository';
import { ProfileDto } from './profile.dto';
import { Profile } from './profile.schema';

@Injectable()
export class ProfileRepository extends BaseRepository<Profile, ProfileDto> {
  constructor(@InjectModel(Profile.name) private profileModel: Model<Profile>) {
    super(profileModel);
  }
}
