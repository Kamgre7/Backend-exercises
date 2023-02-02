import { AxiosResponse } from 'axios';
import { Decorator } from './decorator-class';
import { customHeaders, HttpServiceInterface } from './types';

export class CacheService<T> extends Decorator<T> {
  private cacheUrl = new Map<string, AxiosResponse>();

  constructor(httpService: HttpServiceInterface<T>) {
    super(httpService);
  }

  private checkPage(link: string) {
    return this.cacheUrl.has(link);
  }

  async get(link: string, headers?: customHeaders): Promise<AxiosResponse> {
    const checkLink = this.checkPage(link);

    if (checkLink) {
      return this.cacheUrl.get(link);
    }

    const result = await this.httpService.get(link, headers);
    this.cacheUrl.set(link, result);

    return result;
  }
}
