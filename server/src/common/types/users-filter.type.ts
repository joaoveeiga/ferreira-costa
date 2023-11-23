/* eslint-disable prettier/prettier */
import { StatusEnum } from "../enum";

export interface UsersFilters {
  cpf?: string;
  login?: string;
  status?: StatusEnum;
  birthday?: string;
  createdDate?: string;
  updatedDate?: string;
  ageGroup?: number;
}