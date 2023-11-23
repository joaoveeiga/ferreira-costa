/* eslint-disable prettier/prettier */
import { HttpStatus, ImATeapotException } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { Op } from 'sequelize';
import { CreateEditUserDTO, ListAllUsers, LoginUserDTO } from 'src/common/dtos';
import { AgeGroup, StatusEnum } from 'src/common/enum';
import { User } from 'src/common/models';
import { DatabaseUtils } from './../common/utils/database.utils';

const salt = 8
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
    await this.usersRepository.update({ status: StatusEnum.INACTIVE }, {
      where: {}
    })
    return HttpStatus.OK
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
    return HttpStatus.OK;
  }

  async createEditUser({ birthday, cpf, email, login, motherName, name, password, phoneNumber, status, id }: CreateEditUserDTO) {
    let user
    if (status && !Object.values(StatusEnum).includes(status)) {
      throw new ImATeapotException("Status inválido.")
    }

    if (password && password.length < 6) {
      throw new ImATeapotException("A senha deve ter 6 caracteres ou mais.")
    }
    if (id) {
      user = await this.usersRepository.update({
        birthday,
        cpf,
        email,
        login,
        motherName,
        name,
        password: bcrypt.hashSync(password, salt),
        phoneNumber,
        status
      }, {
        where: {
          id
        }
      })
    } else {
      user = await this.usersRepository.create({
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

    if(!user) {
      throw new ImATeapotException("Ocorreu um erro")
    }
    return HttpStatus.OK
  }

  async login({ login, password }: LoginUserDTO) {
    const user = await this.usersRepository.findOne({
      where: {
        login
      }
    })
    if(!user) {
      return HttpStatus.NOT_FOUND
    }

    if(bcrypt.compareSync(password, user.password)) {
      return HttpStatus.OK
    }
    return HttpStatus.FORBIDDEN
  }
}
