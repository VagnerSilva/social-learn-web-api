import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Profile } from '../schemas/profile.schema';

export class UserDto {
  @MinLength(2)
  @IsNotEmpty({
    message: 'o campo $property e obrigatório',
  })
  name: string;

  @IsEmail(
    {},
    {
      message: 'E-mail invalido!',
    }
  )
  @IsNotEmpty({
    message: 'o campo $property e obrigatório',
  })
  email: string;

  @IsNotEmpty({
    message: 'o campo $property e obrigatório',
  })
  password: string;

  @IsOptional()
  gender: string;

  @IsOptional()
  profile: Profile[];

  constructor(user: Partial<UserDto>) {
    console.log('constructor');
    console.log(user);
    Object.assign(this, user);
  }
}
