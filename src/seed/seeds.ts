import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import MainSeeder from "./main.seeder";
import { User } from "../user/entities/user.entity";
import { Post } from "../post/entities/post.entity";
import { Comment } from "../comment/entities/comment.entity";
import * as dotenv from 'dotenv';
dotenv.config();

const options: DataSourceOptions & SeederOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT as any,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  entities: [User, Post, Comment],
  seeds: [MainSeeder],
  synchronize: true,
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});