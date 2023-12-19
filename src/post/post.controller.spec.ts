import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';

const postEntityList: Post[] = [
  new Post({
    id: 2,
    content: 'Este post fala sobre o tema...',
    user: {
      id: 1,
      name: 'Lucas Prado',
      email: 'emailLucas@exemplo.com',
      password: 'suaSenha123*@',
      comments: [],
      posts: [],
    },
    comments: [],
  }),
];

describe('PostController', () => {
  let postController: PostController;
  let postService: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(postEntityList),
            create: jest.fn().mockResolvedValue(postEntityList[0]),
          },
        },
      ],
    }).compile();

    postController = module.get<PostController>(PostController);
    postService = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(postController).toBeDefined();
    expect(postService).toBeDefined();
  });
  describe('findAll', () => {
    it('should return all posts', async () => {
      const posts = await postController.findAll();
      expect(posts).toEqual(postEntityList);
    });
  });
  describe('create', () => {
    it('should create a new post', async () => {
      const createPostDto = { ...postEntityList[0] };
      const post = await postController.create(
        { user: { id: createPostDto.user.id } },
        { ...createPostDto[0] },
      );
      expect([post]).toEqual([createPostDto]);
    });
  });
  describe('Find post by IDs', () => {
    // it('should a return post', async () => {
    //   const post = await postController.findOne({ user: { id: postEntityList[0].user.id } }, postEntityList[0].id);
    //   expect(post).toEqual(postEntityList);
    // })
  });
});
