import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private commentRepository: Repository<Comment>) { }
  async create(createCommentDto: CreateCommentDto) {
    const comment = await this.commentRepository.create({
      content: createCommentDto.content,
      user: { id: createCommentDto.user },
      post: { id: createCommentDto.post },
    });
    return await this.commentRepository.save(comment);
  }

  async findOne(id: number) {
    const comment = await this.commentRepository.findOne({ where: { id } });
    return comment;
  }

  async findPost(id: number) {
    const comments = await this.commentRepository.find()
    const filter = comments.filter(comment => comment.post.id === id);
    return filter.map(comment => {
      delete comment.post.user;
      delete comment.post.content;
      return comment;
    })
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    await this.commentRepository.update(id, { content: updateCommentDto.content });
    return await this.commentRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    return await this.commentRepository.delete(id);
  }

  async findMyComments(id, userId) {
    const comments = await this.commentRepository.find({ where: { user: userId } });
    const filter = comments.filter(comment => comment.id === id && comment.user.id === userId);
    if (filter.length === 0) {
      throw new UnauthorizedException();
    }
    return filter;
  }
}
