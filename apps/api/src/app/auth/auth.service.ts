/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    email: string,
    pass: string
  ): Promise<Partial<UserDto> | null> {
    const user = await this.usersService.findByEmail(email);
    const isMatch = await user['comparePassword'](pass);
    if (isMatch) {
      const { name, email } = user;
      return { name, email };
    }
    return null;
  }

  async login(user: UserDto) {
    const payload = { name: user.name, sub: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
