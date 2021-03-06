/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProfileDto } from '../profile/profile.dto';
import { BaseService } from './base.service';

export class BaseController<S, D> {
  constructor(private service: S & BaseService<any, any, any>) {}

  @UseGuards(JwtAuthGuard)
  @Post('register')
  async schedule(@Body() data: D): Promise<D> {
    return await this.service.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<D> {
    const result = await this.service.findById(id);

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('all/itens')
  async findAll(): Promise<ProfileDto[]> {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('inactivate/:id')
  async inactivate(@Param('id') id: string): Promise<D> {
    const profile = await this.service.inactivate(id);
    return profile;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('inactivate/:id')
  async delete(@Param('id') id: string): Promise<void> {
    this.service.deleteById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deleteById(@Param('id') id: string): Promise<void> {
    this.service.deleteById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() data: any): Promise<void> {
    await this.service.update(id, data, 'Item atualizado com sucesso.');
  }
}
