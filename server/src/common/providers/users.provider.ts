/* eslint-disable prettier/prettier */
import { User } from "../models/user.model";

export const UsersProvider = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: User,
  },
];
