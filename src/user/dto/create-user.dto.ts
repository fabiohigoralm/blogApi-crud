import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty , IsEmail } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: 'Paulo Salvatore',
    description: `O nome será utilizado para criar o perfil do usuário`,
  })
  @Expose()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'seuEmail@exemplo.com',
    description: `O email será utilizado para criar o perfil do usuário`,
  })
  email: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    example: 'suaSenha123*@',
    description: `Sua senha será utilizado para criar o perfil do usuário`,
  })
  password: string;
 }