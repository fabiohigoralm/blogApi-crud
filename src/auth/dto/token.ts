import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class Token {
  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmc2FAZ21haWwuY29tIiwibmFtZSI6IkZhYmlvIiwiaWF0IjoxNzAyNzE0NzMyLCJleHAiOjE3MDI3MjY3MzJ9.qz_smNVOtkmy0NtOTa8wXouKsm7BBPxkoDhVNH11234',
    description: `Token de acesso`,
    type: String,
  })
  access_token: string;
}
