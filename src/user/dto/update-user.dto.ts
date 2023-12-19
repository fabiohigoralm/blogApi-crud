import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: number;

  @ApiProperty({
    example: 'Paulo Salvatore',
    description: `O nome será utilizado para acessar o blog`,
  })
  name: string;

  @ApiProperty({
    example: 'seuEmail@exemplo.com',
    description: `O email será utilizado para acessar o blog`,
  })
  email: string;
}
