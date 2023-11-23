/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/business/users.service';
import { ListAllUsers, UsersDTO,CreateEditUserDTO } from 'src/common/dtos';
import { User } from 'src/common/models/user.model';
import { ApiExceptionError } from 'src/common/utils';

@Controller('users')
@ApiResponse({ type: ApiExceptionError, status: HttpStatus.UNAUTHORIZED })
@ApiResponse({ type: ApiExceptionError, status: HttpStatus.INTERNAL_SERVER_ERROR })
export class UsersController {
  constructor(private service: UsersService) { }
 
  @Post('/create-edit')
  @HttpCode(200)
  @ApiTags('Users')
  @ApiOperation({ description: 'Criar/editar usuário' })
  @ApiBody({ type: CreateEditUserDTO })
  @ApiResponse({ status: HttpStatus.OK })
  async criarEditarLeadDadosIniciais(@Body() body: CreateEditUserDTO) {
    return this.service.createEditUser(body);
  }

  @Post()
  @HttpCode(200)
  @ApiTags('Users')
  @ApiOperation({ description: 'Listar todos os usuários' })
  @ApiResponse({ type: UsersDTO, status: HttpStatus.OK })
  @ApiBody({ type: ListAllUsers})
  findAll(@Body() data: ListAllUsers): Promise<{ total: number; rows: User[]; }> {
    return this.service.findAll(data)
  }



  @Put()
  @HttpCode(200)
  @ApiTags('Users')
  @ApiOperation({ description: 'Deletar todos os usuários' })
  @ApiResponse({ status: HttpStatus.OK })
  deleteAll(): Promise<any> {
    return this.service.deleteAll()
  }

  @Put("/:id")
  @HttpCode(200)
  @ApiTags('Users')
  @ApiOperation({ description: 'Deletar usuário por ID' })
  @ApiResponse({ status: HttpStatus.OK })
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteUserById(id)
  }
}
