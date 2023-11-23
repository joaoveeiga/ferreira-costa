/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'joaosilva', description: 'Login do usuário' })
  login: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456', description: 'Senha do usuário' })
  password: string;
}