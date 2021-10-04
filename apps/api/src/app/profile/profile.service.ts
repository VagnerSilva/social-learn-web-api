/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { BaseService } from '../utils/base.service';
import { ProfileDto } from './profile.dto';
import { ProfileRepository } from './profile.repository';
import { Profile } from './profile.schema';

@Injectable()
export class ProfileService extends BaseService<
  Profile,
  ProfileDto,
  ProfileRepository
> {
  constructor(private readonly profileRepository: ProfileRepository) {
    super(profileRepository);
  }
}
