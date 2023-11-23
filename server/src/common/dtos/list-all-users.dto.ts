/* eslint-disable prettier/prettier */
import { UsersFilters } from "../types";
import { PagedObjectBodyDTO } from "./paged-object-body.dto";

export class ListAllUsers extends PagedObjectBodyDTO<UsersFilters>  {
  constructor(search: string, page: number, register: number, filters: UsersFilters) {
    super(search, page, register, filters)
  }
}