import { Injectable } from '@nestjs/common';
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
