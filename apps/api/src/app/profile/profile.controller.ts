import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProfileDto } from './profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post('register')
  async schedule(@Body() profile: ProfileDto): Promise<ProfileDto> {
    return await this.profileService.createProfile(profile);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ProfileDto> {
    const result = await this.profileService.findById(id);
    const profile = new ProfileDto(result);
    return profile;
  }

  @Get('all')
  async findAll(): Promise<ProfileDto[]> {
    return this.profileService.findAll() as Promise<ProfileDto[]>;
  }

  @Patch('inactivate/:id"')
  async inactivate(@Param('id') id: string): Promise<ProfileDto> {
    const profile = await this.profileService.inactivate(id);
    return profile;
  }

  @Delete('inactivate/:id')
  async delete(@Param('id') id: string): Promise<void> {
    this.profileService.deleteById(id);
  }
}
