/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BusinessModule } from './business/business.module';
import { UsersService } from './business/users.service';
import { User } from './common/models/user.model';
import { DistributionModule } from './distribution/distribution.module';
import { UsersController } from './distribution/users.controller';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadModels: true,
      synchronize: true,
      models: [User]
    }),
    DistributionModule,
    BusinessModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule { }
