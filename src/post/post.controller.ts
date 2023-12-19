import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Headers } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiOperation({ summary: 'Create a new post' })
  @ApiBearerAuth('access-token')
  @Post()
  async create(@Req() request: Record<string, any>, @Body() createPostDto: CreatePostDto) {
    createPostDto.user = request.user.id;
    return await this.postService.create(createPostDto);
  }


  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiOperation({ summary: 'Find all posts' })
  @Public()
  @Get()
  async findAll() {
    return await this.postService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiOperation({ summary: 'Find post by ID' })
  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiOperation({ summary: 'Update post by ID' })
  @ApiBearerAuth('access-token')
  @Patch(':id')
  async update(@Param('id') id: string, @Req() request: Record<string, any>, @Body() updatePostDto: UpdatePostDto) {
    await this.postService.findMyPosts(+id, request.user.id);
    updatePostDto.user = request.user.id;
    return this.postService.update(+id, updatePostDto);
  }

  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiOperation({ summary: 'Delete post by ID' })
  @ApiBearerAuth('access-token')
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request: Record<string, any>) {
    await this.postService.findMyPosts(+id, request.user.id);
    return this.postService.remove(+id);
  }
}
