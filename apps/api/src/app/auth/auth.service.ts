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

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUser(username);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserDto) {
    const payload = { username: user.name, sub: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
