import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { customHeaders, HttpServiceInterface } from './types';

export class HttpService<T> implements HttpServiceInterface<T> {
  private axiosInstance: AxiosInstance = axios.create();

  async get(link: string, headers?: customHeaders): Promise<AxiosResponse> {
    return this.axiosInstance.get(link, { headers });
  }

  async post(
    link: string,
    data?: T,
    headers?: customHeaders
  ): Promise<AxiosResponse> {
    return await this.axiosInstance.post(link, data, { headers });
  }

  async delete(
    link: string,
    data?: T,
    headers?: customHeaders
  ): Promise<AxiosResponse> {
    return await this.axiosInstance.delete(link, {
      headers,
      data,
    });
  }
}
