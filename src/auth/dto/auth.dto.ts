import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @Expose()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'seuEmail@exemplo.com',
    description: `Sua senha será utilizado para acessar o blog`,
  })
  email: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    example: 'suaSenha123*@',
    description: `Sua senha será utilizado para acessar o blog`,
  })
  password: string;
}
