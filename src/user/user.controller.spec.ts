import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

const userEntityList: User[] = [
  new User({
    name: 'Lucas Prado',
    email: 'emailLucas@exemplo.com',
    password: 'suaSenha123*@',
    comments: [],
    posts: [],
  }),
];

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(userEntityList),
            create: jest.fn().mockResolvedValue(userEntityList),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto = { ...userEntityList[0] };
      const user = await userController.create(createUserDto);
      expect(user).toEqual([userEntityList[0]]);
    });
  });

  describe('Consult Login and Password', () => {
    it('should a return all users with password', async () => {
      const users = await userController.findAll();
      expect(users).toEqual(userEntityList);
    });
  });
});
