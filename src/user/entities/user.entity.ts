import { Post } from "src/post/entities/post.entity";
import { Comment } from "src/comment/entities/comment.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text', { unique: true })
  email: string;

  @OneToMany(() => Post, (post) => post.user, { cascade: true })
  @JoinColumn()
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  @JoinColumn()
  comments: Comment[];

}