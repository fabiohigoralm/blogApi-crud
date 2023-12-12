import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Comment])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
