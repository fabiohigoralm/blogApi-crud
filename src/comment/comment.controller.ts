import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Comments')
@ApiResponse({
  status: 401,
  description: 'Unauthorized',
})
@ApiResponse({
  status: 400,
  description: 'Bad Request',
})
@ApiBearerAuth('access-token')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @ApiOperation({ summary: 'Create a new comment' })
  @Post()
  async create(
    @Req() request: Record<string, any>,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    createCommentDto.user = request.user.id;
    return await this.commentService.create(createCommentDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find comments by post ID' })
  async findOne(@Param('id') id: string) {
    return await this.commentService.findPost(+id);
  }
}
