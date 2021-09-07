/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProfileDto } from './profile.dto';
import { ProfileRepository } from './profile.repository';
import { Profile } from './profile.schema';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}
  3;

  async createProfile(profile: ProfileDto): Promise<ProfileDto> {
    return ((await this.profileRepository.insert(
      profile
    )) as unknown) as ProfileDto;
  }

  async deleteById(id: string) {
    await this.profileRepository.delete(id);
  }

  async findById(id: string): Promise<Profile> {
    const profile = this.profileRepository.findById(id);
    if (!profile) {
      throw new HttpException('Profile não encontrado', HttpStatus.BAD_REQUEST);
    }

    return profile;
  }

  async update(id: string, profile: ProfileDto): Promise<ProfileDto> {
    const result = await this.profileRepository.findByIdAndUpdate(
      { id },
      profile
    );

    if (!result) {
      throw new HttpException('Profile não encontrado', HttpStatus.BAD_REQUEST);
    }

    return result as ProfileDto;
  }

  async findAll(): Promise<ProfileDto[]> {
    return this.profileRepository.findAll() as Promise<ProfileDto[]>;
  }

  async inactivate(id: string): Promise<ProfileDto> {
    const profile = await this.profileRepository.findById(id);
    profile.active = false;
    const save = await this.profileRepository.insert(profile as ProfileDto);
    return (save as unknown) as ProfileDto;
  }
}
