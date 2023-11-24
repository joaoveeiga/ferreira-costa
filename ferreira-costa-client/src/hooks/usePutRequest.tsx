import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  MutationFunction,
  MutationStatus,
  useMutation,
  UseMutationOptions,
} from "react-query";
import useAPI from "./useAPI";

type Config = {
  config: AxiosRequestConfig;
};

export type UsePutRequestStatus = MutationStatus;

export type UsePutRequestOptionsType<TData, TError, TVariables> =
  UseMutationOptions<AxiosResponse<TData>, AxiosError<TError>, TVariables, any>;

export default function usePutRequest<
  TData = any,
  TVariables = any,
  TError = any
>(url: string, options?: UsePutRequestOptionsType<TData, TError, TVariables>) {
  const API = useAPI();

  const mutationFunction: MutationFunction<
    AxiosResponse<TData>,
    TVariables & Config
  > = ({ config, ...data }) => {
    return API.put(url, data, { ...config });
  };

  return useMutation<AxiosResponse<TData>, AxiosError<TError>, TVariables, any>(
    mutationFunction,
    options
  );
}
