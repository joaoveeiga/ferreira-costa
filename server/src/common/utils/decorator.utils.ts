/* eslint-disable prettier/prettier */
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from "@nestjs/swagger";

export class ApiExceptionError {
  @ApiProperty({
    description: 'Código HTTP do erro'
  })
  status: HttpStatus = HttpStatus.I_AM_A_TEAPOT;

  @ApiProperty({
    description: 'Mensagem do erro',
  })
  message?: string;
}
