/* eslint-disable prettier/prettier */
import { Sequelize, Op } from "sequelize";

const noSensitive = (columnName: string, value: string) => {
  return [Sequelize.where(Sequelize.col(columnName), {
    [Op.iLike]: `%${value}%`,
  })]
}

const pagination = (page: number, count: number) => {
  const offset = 0 + (page - 1) * count;
  return !page || !count ? {} : { limit: count, offset };
};

export const DatabaseUtils = {
  noSensitive,
  pagination,
};
