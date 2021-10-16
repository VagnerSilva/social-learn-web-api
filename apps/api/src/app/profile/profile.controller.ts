import { Controller } from '@nestjs/common';
import { BaseController } from '../utils/base.controller';
import { ProfileDto } from './profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController extends BaseController<
  ProfileService,
  ProfileDto
> {
  constructor(private profileService: ProfileService) {
    super(profileService);
  }
}
