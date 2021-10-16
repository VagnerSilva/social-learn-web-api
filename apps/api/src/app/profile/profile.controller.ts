import { Controller } from '@nestjs/common';
import { BaseController } from '../utils/base.controller';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController extends BaseController<ProfileService> {
  constructor(private profileService: ProfileService) {
    super(profileService);
  }
}
