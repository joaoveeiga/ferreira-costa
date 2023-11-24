/* eslint-disable prettier/prettier */
// import { UsersFilters } from "../types";
// import { PagedObjectBodyDTO } from "./paged-object-body.dto";

// export class ListAllUsers extends PagedObjectBodyDTO<UsersFilters>  {
//   constructor(search: string, page: number, register: number, filters: UsersFilters) {
//     super(search, page, register, filters)
//   }
// }

/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ListAllUsers {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'bia', description: 'Campo de busca pelo nome' })
  search: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: '1', description: 'Página da paginação' })
  page: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: '6', description: 'Quantidade de registros a serem exibidos' })
  count: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '086', description: 'Campo de busca pelo cpf' })
  cpf?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'jv', description: 'Campo de busca pelo login' })
  login?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'ACTIVE', description: 'Campo de busca pelo status' })
  status?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '1', description: 'Ordernar por data de nascimento ou createdAt ou updatedAt' })
  orderBy?: string;
  
  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: '1', description: 'Ordernar por data de nascimento ou createdAt ou updatedAt' })
  ageGroup?: number;
}