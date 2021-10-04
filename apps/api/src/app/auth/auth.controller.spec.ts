import { createMock, DeepMocked } from '@golevelup/nestjs-testing';
import { JwtModule } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { EmailModule } from '../email/email.module';
import { UserModule } from '../user/user.module';
import { User } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

export const mockLogin: Partial<User> = {
  id: '00000000-00000000-00000000-00000000-00000000',
  name: 'test',
  email: 'email@example',
  password: '123456',
  gender: '',
  recoverToken: '',
  profile: [],
  learningContents: [],
};

export const mockToken = 'fefoekof.rpeoirpoeiroeorioerie.rererékoreokropek';

describe('AuthController', () => {
  let app: TestingModule;
  let authController: AuthController;
  let authService: DeepMocked<AuthService>;
  let userService: DeepMocked<UserService>;

  beforeAll(async () => {
    process.env = { SECRET: 'TEST' };
    authService = createMock<AuthService>();
    userService = createMock<UserService>();

    app = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: process.env.SECRET,
          signOptions: { expiresIn: '24h' },
        }),
        UserModule,
        EmailModule,
      ],
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy, JwtStrategy],
    })
      .overrideProvider(getModelToken(User.name))
      .useValue(mockLogin)
      .overrideProvider(AuthService)
      .useValue(authService)
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();

    authController = app.get<AuthController>(AuthController);
  });

  it('should get access_token"', async () => {
    userService['findById'].mockResolvedValue(mockLogin);
    authService.login.mockResolvedValue({ access_token: mockToken });
    expect(await authController.login(mockLogin)).toEqual({
      access_token: mockToken,
    });
  });

  it('should send email to recovery password', async () => {
    authService.sendRecoverPasswordEmail.getMockImplementation();
    authController.sendRecoverPasswordEmail('email@mail.com');
    expect(authService.sendRecoverPasswordEmail).toHaveBeenCalled();
  });

  it('should change password', async () => {
    userService.changePassword.mockImplementation(() =>
      Promise.resolve('Senha alterada com sucesso.')
    );
    const result = await authController.changePassword(
      '00000000000',
      '123456',
      '654321'
    );
    expect(result).toEqual('Senha alterada com sucesso.');
  });

  it('should be invalid password  when to trying change the password', async () => {
    userService.changePassword.mockImplementationOnce(() =>
      Promise.reject('Senha invalida.')
    );
    await authController.changePassword('00000000000', '00000', '654321');
    expect(userService.changePassword).toThrow('Senha invalida.');
  });
});
