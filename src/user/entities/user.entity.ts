import { Post } from "../../post/entities/post.entity";
import { Comment } from "../../comment/entities/comment.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false })
  name: string;
  
  @Column('text', { unique: true, nullable: false })
  email: string;

  @Column({ select: false, nullable: false })
  password: string;

  @OneToMany(() => Post, (post) => post.user, { cascade: true })
  @JoinColumn()
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  @JoinColumn()
  comments: Comment[];

  constructor(user?: Partial<User>) {
    this.id = user?.id;
    this.name = user?.name;
    this.email = user?.email;
    this.password = user?.password;
    this.posts = user?.posts;
    this.comments = user?.comments;
  }
}