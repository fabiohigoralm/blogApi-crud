import { Comment } from '../comment/entities/comment.entity';
import { Post } from '../post/entities/post.entity';
import { User } from '../user/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class MainSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const userRepository = dataSource.getRepository(User);
    const postRepository = dataSource.getRepository(Post);
    const commentRepository = dataSource.getRepository(Comment);

    await userRepository.query(`INSERT INTO public."user" ("name",email,"password") VALUES
    ('Lucas Prado','emailLucas@exemplo.com','suaSenha123*@'),
    ('Gisele Alcantra','emailGisele@email.com','senhaDaGisele'),
    ('Fernando Sales','emailFernado@email.com','senhaDoFernado'),
    ('Ana de Souza','ana@souza.com','senhaDaAna');
    `);

    await postRepository.query(`INSERT INTO public.post ("content","userId") VALUES
	 ('Este post fala sobre o tema AA',4),('Este post fala sobre o tema BB',3),
   ('Este post fala sobre o tema CC',2),('Este post fala sobre o tema DD',4);
    `);

    await commentRepository.query(`INSERT INTO public.comment ("content","postId","userId") VALUES 
    ('Comentario na postagem ZYS',1,1),
    ('Comentario na postagem KJY',2,2),
    ('Comentario na postagem GQS',3,3),
    ('Comentario na postagem VZL',4,3),
    ('Comentario na postagem NQA',4,4),
    ('Comentario na postagem TIO',1,2);`);
  }
}
