import { User } from "../../user/entities/user.entity";
import { Comment } from "../../comment/entities/comment.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  content: string;

  @ManyToOne(() => User, (user) => user.posts, { eager: true, onDelete: "CASCADE", nullable: false })
  @JoinColumn()
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post, { onDelete: "CASCADE" })
  @JoinColumn()
  comments: Comment[];
}