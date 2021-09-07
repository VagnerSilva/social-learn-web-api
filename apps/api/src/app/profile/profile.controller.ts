import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProfileDto } from './profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post('register')
  async schedule(@Body() profile: ProfileDto): Promise<ProfileDto> {
    return await this.profileService.createProfile(profile);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  async findById(@Param('id') id: string): Promise<ProfileDto> {
    const result = await this.profileService.findById(id);
    const profile = new ProfileDto(result);
    return profile;
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll(): Promise<ProfileDto[]> {
    return this.profileService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('inactivate/:id')
  async inactivate(@Param('id') id: string): Promise<ProfileDto> {
    const profile = await this.profileService.inactivate(id);
    return profile;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('inactivate/:id')
  async delete(@Param('id') id: string): Promise<void> {
    this.profileService.deleteById(id);
  }
}
