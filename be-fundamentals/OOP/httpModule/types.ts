import { AxiosResponse } from 'axios';

export type customHeaders = Record<string, string>;

export interface HttpServiceInterface<T> {
  get(link: string, headers: customHeaders): Promise<AxiosResponse>;
  post(link: string, data?: T, headers?: customHeaders): Promise<AxiosResponse>;
  delete(
    link: string,
    data?: T,
    headers?: customHeaders
  ): Promise<AxiosResponse>;
}
