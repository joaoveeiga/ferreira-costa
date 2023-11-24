/* eslint-disable prettier/prettier */
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'users'})
export class User extends Model<User> {
  @Column({
    field: 'id',
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @Column({
    field: 'name',
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    field: 'login',
    type: DataType.STRING,
    allowNull: false,
  })
  login: string;

  @Column({
    field: 'password',
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    field: 'email',
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    field: 'phoneNumber',
    type: DataType.STRING,
    allowNull: false,
  })
  phoneNumber: string;

  @Column({
    field: 'cpf',
    type: DataType.STRING,
    allowNull: false,
  })
  cpf: string;

  @Column({
    field: 'birthday',
    type: DataType.DATE,
    allowNull: false,
  })
  birthday: Date;

  @Column({
    field: 'motherName',
    type: DataType.STRING,
    allowNull: false,
  })
  motherName: string;

  @Column({
    field: 'status',
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;

  @Column({
    field: 'createdAt',
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt: string;

  @Column({
    field: 'updatedAt',
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt: string;
}