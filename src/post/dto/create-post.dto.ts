import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  id: number;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Este post fala sobre o tema...',
    description: `O conteudo do post`,
    type: String,
  })
  content: string;
  user: any;
  comments: any;
}
