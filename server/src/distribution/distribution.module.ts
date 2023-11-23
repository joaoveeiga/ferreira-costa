/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { BusinessModule } from 'src/business/business.module';

@Module({
  controllers: [UsersController],
  imports: [BusinessModule]
})
export class DistributionModule {}
