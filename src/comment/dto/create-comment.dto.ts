import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  id: number;
  @ApiProperty({
    example: 'Este comentario fala sobre a postagem ...',
    description: `O conteudo do comentario`,
    type: String,
  })
  @IsNotEmpty()
  content: string;

  user: number;

  @ApiProperty({
    example: '13',
    description: `#ID da postagem`,
    type: Number,
  })
  @IsNotEmpty()
  post: number;
}
