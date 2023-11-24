import { AxiosError, AxiosResponse } from "axios";
import {
  MutationFunction,
  MutationStatus,
  UseMutationOptions,
  useMutation,
} from "react-query";
import useAPI from "./useAPI";

export type UsePostRequestStatus = MutationStatus;

export type UsePostRequestOptionsType<TData, TError, TVariables> =
  UseMutationOptions<AxiosResponse<TData>, AxiosError<TError>, TVariables, any>;

export default function usePostRequest<
  TData = any,
  TVariables = any,
  TError = any
>(url: string, options?: UsePostRequestOptionsType<TData, TError, TVariables>) {
  const API = useAPI();

  const mutationFunction: MutationFunction<AxiosResponse<TData>, TVariables> = (
    data
  ) => {
    return API.post(url, data);
  };

  return useMutation<AxiosResponse<TData>, AxiosError<TError>, TVariables, any>(
    mutationFunction,
    options
  );
}
