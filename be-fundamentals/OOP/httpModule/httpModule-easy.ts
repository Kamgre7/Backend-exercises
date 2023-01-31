import axios, { AxiosInstance } from 'axios';
import { customHeaders, HttpServiceInterface } from './types';

class HttpService implements HttpServiceInterface {
  private axios: AxiosInstance = axios.create();

  async get<T>(link: string, headers: customHeaders = {}): Promise<T> {
    return await this.axios.get(link, { headers });
  }

  async post<T, K>(
    link: string,
    data: K | {} = {},
    headers: customHeaders = {}
  ): Promise<T> {
    return await this.axios.post(link, data, { headers });
  }

  async delete<T, K>(
    link: string,
    data: K | {} = {},
    headers: customHeaders = {}
  ): Promise<T> {
    return await this.axios.delete(link, {
      headers,
      data,
    });
  }
}

class Decorator implements HttpServiceInterface {
  protected httpService: HttpServiceInterface;

  constructor(httpService: HttpServiceInterface) {
    this.httpService = httpService;
  }

  async get<T>(link: string, headers: customHeaders = {}): Promise<T> {
    return await this.httpService.get(link, headers);
  }

  async post<T, K>(
    link: string,
    data: K | {} = {},
    headers: customHeaders = {}
  ): Promise<T> {
    return await this.httpService.post(link, data, headers);
  }

  async delete<T, K>(
    link: string,
    data: K | {} = {},
    headers: customHeaders = {}
  ): Promise<T> {
    return await this.httpService.delete(link, data, headers);
  }
}

class CacheService<T> extends Decorator {
  cacheArray: any[] = [];

  constructor(httpService: HttpServiceInterface) {
    super(httpService);
  }

  private checkPage(link: string) {
    return this.cacheArray.find((element) => element === link);
  }

  async get<T>(link: string, headers: customHeaders = {}): Promise<T> {
    const checkLink = this.checkPage(link);
    if (checkLink) {
      checkLink;
    }

    const result: T = await this.httpService.get(link, headers);
    this.cacheArray.push(result);

    return result;
  }
}

const httpServiceExample = new HttpService();
const serviceCache = new CacheService(httpServiceExample);

httpServiceExample.get('http://example.com');
serviceCache.get('http://example.com');
