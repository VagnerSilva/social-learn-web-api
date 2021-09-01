import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { validate } from 'class-validator';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userSrv: UserService) {}

  @Post('register')
  async createUser(@Res() res, @Body() userDto: UserDto) {
    await validate(userDto);

    const user = await this.userSrv.createUser(userDto);
    return res.status(HttpStatus.OK).json(user);
  }
}
