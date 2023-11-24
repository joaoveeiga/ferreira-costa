/* eslint-disable prettier/prettier */
import { HttpStatus, ImATeapotException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { Op, Sequelize } from 'sequelize';
import { CreateEditUserDTO, ListAllUsers, LoginUserDTO, UpdatePasswordDTO, VerifyEmailCpfDTO } from 'src/common/dtos';
import { AgeGroup, OrderBy, StatusEnum } from 'src/common/enum';
import { User } from 'src/common/models';
import { DatabaseUtils } from './../common/utils/database.utils';

const salt = 8
@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User
  ) { }

  async findAll({ count, cpf, login, orderBy, status, page, search, ageGroup }: ListAllUsers) {
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

    let column: string;

    switch (orderBy) {
      case OrderBy.BIRTHDAY:
        column = 'birthday'
        break;
      case OrderBy.CREATED_AT:
        column = 'createdAt'
        break;
      case OrderBy.UPDATED_AT:
        column = 'updatedAt'
        break;
      default:
        column = 'id'
        break;
    }

    const where = [
      { ...(search && DatabaseUtils.noSensitive("name", search)) },
      { ...(login && DatabaseUtils.noSensitive("login", login)) },
      { ...(cpf && DatabaseUtils.noSensitive("cpf", cpf)) },
      {
        ...(ageGroup && { birthday: { [Op.lt]: Sequelize.fn('TO_DATE', filterAgeGroup[0], 'YYYY-MM-DD') } })
      }
    ];
    if (status) {
      where.push({ status: { [Op.eq]: status } } as any)
    }
    else {
      where.push({ status: { [Op.ne]: StatusEnum.INACTIVE } } as any)
    }
    if (ageGroup && ageGroup !== AgeGroup.EXPERIENCED) {
      where.push({ birthday: { [Op.gt]: Sequelize.fn('TO_DATE', filterAgeGroup[1], 'YYYY-MM-DD') } } as any);
    }

    const { count: total, rows } = await this.usersRepository.findAndCountAll({
      where: {
        [Op.and]: where
      },
      ...DatabaseUtils.pagination(page, count),
      order: [
        [column, 'ASC']
      ]
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
      const alreadyExistsThisLogin = await this.usersRepository.findOne({ where: { login } })
      if (alreadyExistsThisLogin && alreadyExistsThisLogin.id !== id) {
        throw new ImATeapotException()
      }
      user = await this.usersRepository.update({
        birthday,
        cpf,
        email,
        login,
        motherName,
        name,
        password: await bcrypt.hash(password, salt),
        phoneNumber,
        status
      }, {
        where: {
          id
        }
      })
    } else {
      const alreadyExistsThisLogin = await this.usersRepository.findOne({ where: { login } })
      if (alreadyExistsThisLogin) {
        throw new ImATeapotException()
      }
      user = await this.usersRepository.create({
        birthday,
        cpf,
        email,
        login,
        motherName,
        name,
        password: await bcrypt.hash(password, salt),
        phoneNumber,
        status
      })
    }

    if (!user) {
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

    if (!user) {
      throw new ImATeapotException("Not found")
    }

    if (user.status !== StatusEnum.ACTIVE) {
      throw new ImATeapotException("Cadastro inativo ou bloqueado.")
    }

    if (bcrypt.compareSync(password, user.password)) {
      return HttpStatus.OK
    }
    throw new ImATeapotException()
  }

  async verifyEmailCpf({ email, cpf }: VerifyEmailCpfDTO) {
    const user = await this.usersRepository.findOne({
      where: {
        [Op.and]: {
          email,
          cpf
        }
      }
    })

    if (!user) {
      throw new ImATeapotException()
    }
    return user.id
  }

  async updatePassword({ id, password }: UpdatePasswordDTO) {
    const user = await this.usersRepository.findOne({ where: { id } })

    if (!user) {
      throw new ImATeapotException()
    }
    await this.usersRepository.update({
      password: await bcrypt.hash(password, salt),
    }, {
      where: {
        id
      }
    })
  }
}
