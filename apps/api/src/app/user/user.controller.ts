import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userSrv: UserService) {}

  @Post('register')
  async createUser(@Res() res, @Body(ValidationPipe) userDto: UserDto) {
    const user = await this.userSrv.createUser(userDto);
    return res.status(HttpStatus.OK).json(user);
  }
}
