import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Post } from 'src/post/entities/post.entity';
import { Comment } from 'src/comment/entities/comment.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Comment])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
