import React, { createContext, useState } from "react";
import { UserStatus } from "../types";

interface LoggedUserProviderState {
  logged: boolean;
  status: UserStatus;
  name: string;
}

interface LoggedUserProviderActions {
  setLogged: (logged: boolean) => void;
  setStatus: (status: UserStatus) => void;
}

type LoggedUserProviderData = [
  state: LoggedUserProviderState,
  actions: LoggedUserProviderActions
];

export const LoggedUserContext = createContext<LoggedUserProviderData>(
  {} as LoggedUserProviderData
);

interface LoggedUserProviderProps {
  children: React.ReactNode;
}

export const LoggedUserProvider: React.FC<LoggedUserProviderProps> = ({
  children,
}) => {
  const [isLogged, updateLogged] = useState<boolean>(false);
  const [getStatus, updateStatus] = useState<UserStatus>();
  const [name, _] = useState<string>();

  const setLogged = (logged: boolean) => {
    updateLogged(logged);
  };

  const setStatus = (status: UserStatus) => {
    updateStatus(status)
  }

  return (
    <LoggedUserContext.Provider
      children={children}
      value={[
        {
          logged: isLogged,
          status: getStatus,
          name,
        },
        {
          setLogged,
          setStatus
        },
      ]}
    />
  );
};
