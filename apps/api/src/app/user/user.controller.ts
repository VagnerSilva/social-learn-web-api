import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userSrv: UserService) {}

  @Post('register')
  async createUser(@Res() res, @Body() userDto: UserDto) {
    console.log('antes de');
    console.log(userDto);

    //  await validate(userDto);
    console.log('depois de');
    console.log(userDto);

    const user = await this.userSrv.createUser(userDto);
    console.log('sererer');
    console.log(user);

    return res.status(HttpStatus.OK).json(user);
  }
}
