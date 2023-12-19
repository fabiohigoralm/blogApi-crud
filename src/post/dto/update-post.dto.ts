import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Atualização do post',
    description: `O novo conteudo do post`,
    type: String,
  })
  content: string;
}
