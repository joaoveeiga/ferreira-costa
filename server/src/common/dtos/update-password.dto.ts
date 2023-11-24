/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdatePasswordDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: '2', description: 'ID do usuário' })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456', description: 'Nova senha do usuário' })
  password: string;
}