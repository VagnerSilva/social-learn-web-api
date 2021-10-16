/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { EmailService } from '../email/email.service';
import { UserDto } from '../user/user.dto';
import { User } from '../user/user.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private emailService: EmailService
  ) {}

  async validateUser(
    username: string,
    pass: string
  ): Promise<Partial<UserDto> | null> {
    const user = await this.usersService.findByUsername(username);
    const isMatch = await user['comparePassword'](pass);
    if (isMatch) {
      const id = user['_id'];
      const { name, email } = user;
      return { name, email, id };
    }
    return null;
  }

  async login(user: UserDto) {
    const payload = { name: user.name, sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async sendRecoverPasswordEmail(email: string): Promise<void> {
    const user = (await this.usersService.findByEmail(email)) as User;

    if (!user)
      throw new NotFoundException('Não há usuário cadastrado com esse email.');

    user.recoverToken = randomBytes(32).toString('hex');
    await user.save();
    await this.emailService.sendRecoverPasswordEmail(user);
  }

  async changePassword(
    id: string,
    password: string,
    newPassword: string
  ): Promise<string> {
    return await this.usersService.changePassword(id, password, newPassword);
  }
}
