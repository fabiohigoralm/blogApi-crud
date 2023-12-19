import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postRepository: Repository<Post>) { }
  async create(createPostDto: CreatePostDto) {

    const post = this.postRepository.create(createPostDto);
    return await this.postRepository.save(post);
  }

  async findAll() {
    return await this.postRepository.find();
  }

  async findMyPosts(id, userId) {
    const posts = await this.postRepository.find({ where: { user: userId } });
    const filter = posts.filter(post => post.id === id && post.user.id === userId);
    if (filter.length === 0) {
      throw new UnauthorizedException();
    }
    return filter;
  }

  async findOne(id: number) {
    return await this.postRepository.findOne({
      where: { id },
    })
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.postRepository.update(id, { content: updatePostDto.content });
    return await this.postRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    return await this.postRepository.delete(id);
  }
}
