/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class VerifyEmailCpfDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'example@email.com', description: 'Email do usuário' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '125.784.014-96', description: 'CPF do usuário' })
  cpf: string;
}