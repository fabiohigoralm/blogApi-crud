import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  content: string;

  @ManyToOne(() => User, (user) => user.posts, {
    eager: true,
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post, { onDelete: 'CASCADE' })
  @JoinColumn()
  comments: Comment[];

  constructor(post?: Partial<Post>) {
    this.id = post?.id;
    this.content = post?.content;
    this.user = {
      id: post?.user?.id,
      name: post?.user?.name,
      email: post?.user?.email,
      password: post?.user?.password,
      posts: post?.user?.posts,
      comments: post?.user?.comments,
    };
    this.comments = post?.comments;
  }
}
