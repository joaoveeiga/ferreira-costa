import { HttpStatus, ImATeapotException } from '@nestjs/common';
/* eslint-disable prettier/prettier */
import { DatabaseUtils } from './../common/utils/database.utils';
import { Inject, Injectable } from '@nestjs/common';
import { CreateEditUserDTO, ListAllUsers } from 'src/common/dtos';
import { Op, literal, col, fn } from 'sequelize';
import { User } from 'src/common/models';
import { AgeGroup, StatusEnum } from 'src/common/enum';
import * as moment from 'moment';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User
  ) { }

  async findAll({ count, filters, page, search }: ListAllUsers) {
    const { ageGroup, cpf, createdDate, login, status, updatedDate } = filters ?? {}
    const filterAgeGroup = []
    const subtractYearsFromToday = (years: number) => new Date(moment().subtract(years, 'years').format('YYYY-MM-DD'))
    switch (ageGroup) {
      case AgeGroup.YOUNG_ADULTS:
        filterAgeGroup.push(subtractYearsFromToday(18));
        filterAgeGroup.push(subtractYearsFromToday(26));
        break;
      case AgeGroup.EARLY_ADULTS:
        filterAgeGroup.push(subtractYearsFromToday(25));
        filterAgeGroup.push(subtractYearsFromToday(31));
        break;
      case AgeGroup.MID_ADULTS:
        filterAgeGroup.push(subtractYearsFromToday(30));
        filterAgeGroup.push(subtractYearsFromToday(36));
        break;
      case AgeGroup.LATE_ADULTS:
        filterAgeGroup.push(subtractYearsFromToday(35));
        filterAgeGroup.push(subtractYearsFromToday(41));
        break;
      case AgeGroup.EXPERIENCED:
        filterAgeGroup.push(subtractYearsFromToday(40))
        break;
    }

    const where = [
      { ...(search && DatabaseUtils.noSensitive("name", search)) },
      { ...(login && DatabaseUtils.noSensitive("login", login)) },
      { ...(cpf && DatabaseUtils.noSensitive("cpf", cpf)) },
      // {
      //   ...(ageGroup && { birthday: { [Op.lt]: new Date(filterAgeGroup[0]) } })
      // }
    ];

    if (status) {
      where.push({ status: { [Op.eq]: status } } as any)
    }
    else {
      where.push({ status: { [Op.ne]: StatusEnum.INACTIVE } } as any)
    }
    // if (ageGroup && ageGroup !== AgeGroup.EXPERIENCED) {
    //   where.push({ birthday: { [Op.gt]: new Date(filterAgeGroup[1]) } } as any);
    // }

    const { count: total, rows } = await this.usersRepository.findAndCountAll({
      where: {
        [Op.and]: where
      },
      ...DatabaseUtils.pagination(page, count)
    });
    return { total, rows }
  }

  async deleteAll() {
    return this.usersRepository.update({ status: StatusEnum.INACTIVE }, {
      where: {}
    })
  }

  async deleteUserById(id: number) {
    await this.usersRepository.update(
      { status: StatusEnum.INACTIVE },
      {
        where: {
          id
        }
      }
    );
  }

  async createEditUser({ birthday, cpf, email, login, motherName, name, password, phoneNumber, status, id }: CreateEditUserDTO) {
    if(status && !Object.values(StatusEnum).includes(status)) {
      throw new ImATeapotException("Status inválido.")
    }

    if(password && password.length < 6) {
      throw new ImATeapotException("A senha deve ter 6 caracteres ou mais.")
    }
    if (id) {
      await this.usersRepository.update({
        birthday,
        cpf,
        email,
        login,
        motherName,
        name,
        password,
        phoneNumber,
        status
      }, {
        where: {
          id
        }
      })
    } else {
      await this.usersRepository.create({
        birthday,
        cpf,
        email,
        login,
        motherName,
        name,
        password,
        phoneNumber,
        status
      })
    }
    return HttpStatus.OK
  }
}
