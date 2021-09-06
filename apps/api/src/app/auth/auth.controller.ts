/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('recover/password')
  async sendRecoverPasswordEmail(
    @Body('email') email: string
  ): Promise<{ message: string }> {
    await this.authService.sendRecoverPasswordEmail(email);
    return {
      message: 'Foi enviado um email com instruções para reset de senha',
    };
  }

  @Patch('reset/password')
  async changePassword(
    @Body('id') id: string,
    @Body('password') password: string,
    @Body('newPassword') newPassword: string
  ): Promise<string> {
    console.log(newPassword);
    return await this.userService.changePassword(id, password, newPassword);
  }
}
