/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsDate } from "class-validator";
import { StatusEnum } from "../enum";

export class CreateEditUserDTO {  
    @IsNumber()
    @IsOptional()
    @ApiProperty({ example: 1, description: 'ID do usuário' })
    id?: number;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'João da Silva', description: 'Nome do usuário' })
    name: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'joaosilva', description: 'Login do usuário' })
    login: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '123456', description: 'Senha do usuário' })
    password: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'joao.silva@example.com', description: 'E-mail do usuário' })  
    email: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '(81) 99876-1234', description: 'Número do celular do usuário' })
    phoneNumber: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '125.068.404-15', description: 'CPF do usuário' })
    cpf: string;
  
    @IsDate()
    @IsNotEmpty()
    @ApiProperty({ example: '23/11/2000', description: 'Data de nascimento do usuário' })
    birthday: Date;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Maria da Silva', description: 'Nome da mãe do usuário' })
    motherName: string;
  
    @IsNotEmpty()
    @IsEnum(StatusEnum)
    @ApiProperty({ example: StatusEnum.ACTIVE, description: 'Status do usuário' })
    status: StatusEnum;
}