import { AxiosResponse } from 'axios';
import { Decorator } from './decorator-class';
import { customHeaders, HttpServiceInterface } from './types';

export class CacheService<T> extends Decorator<T> {
  private cacheUrl: Map<string, AxiosResponse>;

  constructor(
    httpService: HttpServiceInterface<T>,
    cacheUrlDb: Map<string, AxiosResponse>
  ) {
    super(httpService);
    this.cacheUrl = cacheUrlDb;
  }

  private checkPage(link: string): boolean {
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
