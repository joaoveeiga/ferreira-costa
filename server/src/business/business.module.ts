/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersProvider } from 'src/common/providers';
import { UsersService } from './users.service';

@Module({
  providers: [
    ...UsersProvider,
    UsersService,
  ],
  exports: [
    ...UsersProvider,
    UsersService,
  ]
})
export class BusinessModule { }
