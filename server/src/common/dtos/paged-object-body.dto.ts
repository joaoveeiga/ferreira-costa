/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class PagedObjectBodyDTO<T> {

  @ApiProperty({ description: "String de buscar" })
  @IsOptional()
  search?: string;

  @ApiProperty({ description: "Filtros (caso existam)" })
  @IsOptional()
  filters?: T;

  @ApiProperty({ description: "Número da página" })
  @IsOptional()
  page?: number;

  @ApiProperty({ description: "Quantidade de registro que será apresentado" })
  @IsOptional()
  count?: number;
  
  constructor(search: string, page: number, count: number, filters: T) {
    this.search = search
    this.filters = filters
    this.page = page
    this.count = count
  }
}