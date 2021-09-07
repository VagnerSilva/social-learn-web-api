/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProfileDto } from '../profile/profile.dto';
import { BaseService } from './base.service';

export class BaseController<S> {
  constructor(private service: S & BaseService<any, any, any>) {}

  @UseGuards(JwtAuthGuard)
  @Post('register')
  async schedule(@Body() profile: ProfileDto): Promise<ProfileDto> {
    return await this.service.create(profile);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<ProfileDto> {
    const result = await this.service.findById(id);
    const profile = new ProfileDto(result);
    return profile;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<ProfileDto[]> {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('inactivate/:id')
  async inactivate(@Param('id') id: string): Promise<ProfileDto> {
    const profile = await this.service.inactivate(id);
    return profile;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('inactivate/:id')
  async delete(@Param('id') id: string): Promise<void> {
    this.service.deleteById(id);
  }
}
