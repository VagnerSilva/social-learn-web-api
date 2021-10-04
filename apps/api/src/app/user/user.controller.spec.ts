import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserDto } from './user.dto';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

const user = {
  id: '123',
  name: 'Deo John',
  email: 'test@test',
} as UserDto;

const mockUserService = {
  createUser: jest.fn(() => {
    return user;
  }),
};
describe('UserController', () => {
  let app: TestingModule;
  let userController: UserController;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideProvider(UserRepository)
      .useValue({})
      .compile();
    userController = app.get<UserController>(UserController);
  });

  it('should return "data user"', async () => {
    const response = {
      status: (code: number) => {
        return { json: (body?: any) => user };
      },
    };
    const result = await userController.createUser(response, {
      name: 'Deo John',
      email: 'test@test',
      password: '123456789',
      profile: [],
      gender: 'M',
    });
    expect(result).toEqual(user);
  });
});
