import React, { createContext, useState } from "react";
import { User } from "../types";

interface ListUsersProviderState {
  users: User[]
}

interface ListUsersProviderActions {
  setUsers: (user: User[]) => void
}

type ListUsersProviderData = [
  state: ListUsersProviderState,
  actions: ListUsersProviderActions
];

export const ListUsersContext = createContext<ListUsersProviderData>(
  {} as ListUsersProviderData
);

interface ListUsersProviderProps {
  children: React.ReactNode;
}

export const ListUsersProvider: React.FC<ListUsersProviderProps> = ({
  children,
}) => {
  const [users, updateUsers] = useState<User[]>([]);

  const setUsers = (user: User[]) => {
    updateUsers(user);
  };

  return (
    <ListUsersContext.Provider
      children={children}
      value={[
        {
          users
        },
        {
          setUsers
        },
      ]}
    />
  );
};
