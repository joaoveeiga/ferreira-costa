import React, { createContext, useMemo } from "react";
import Axios, { AxiosInstance } from "axios";

export const APIContext = createContext<AxiosInstance>(null);

export const APIProvider = ({ children }) => {
  const API = useMemo(
    () => Axios.create({ baseURL: "http://192.168.1.12:3000/" }),
    []
  );
  return <APIContext.Provider children={children} value={API} />;
};

APIProvider.Context = APIContext;
