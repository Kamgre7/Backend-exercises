import { AxiosResponse } from 'axios';
import { customHeaders, HttpServiceInterface } from './types';

export class Decorator<T> implements HttpServiceInterface<T> {
  protected httpService: HttpServiceInterface<T>;

  constructor(httpService: HttpServiceInterface<T>) {
    this.httpService = httpService;
  }

  async get(link: string, headers?: customHeaders): Promise<AxiosResponse> {
    return await this.httpService.get(link, headers);
  }

  async post(
    link: string,
    data: T,
    headers: customHeaders
  ): Promise<AxiosResponse> {
    return await this.httpService.post(link, data, headers);
  }

  async delete(
    link: string,
    data?: T,
    headers?: customHeaders
  ): Promise<AxiosResponse> {
    return await this.httpService.delete(link, data, headers);
  }
}
