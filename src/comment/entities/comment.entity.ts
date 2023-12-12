import { Post } from "src/post/entities/post.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @ManyToOne(() => User, (user) => user.comments, { eager: true, onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Post, (post) => post.comments, { eager: true , onDelete: "CASCADE" })
  @JoinColumn()
  post: Post;
}
