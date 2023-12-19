import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

const userEntityList: User[] = [
  new User({
    id: 1,
    name: 'Lucas Prado',
    email: 'emailLucas@exemplo.com',
    password: 'suaSenha123*@',
    comments: [],
    posts: [],
  }),
];

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(userEntityList),
            create: jest.fn().mockResolvedValue(userEntityList[0]),
            save: jest.fn().mockResolvedValue(userEntityList[0]),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = await userService.findAll();
      expect(users).toEqual(userEntityList);
    });
  });
  describe('Create', () => {
    it('should create a new user', async () => {
      const createUserDto = { ...userEntityList[0] };
      const user = await userService.create(createUserDto);
      expect([user]).toEqual([userEntityList[0]]);
    });
  });
  describe('SignIn', () => {
    it('should a return token_access', async () => {});
  });
});
