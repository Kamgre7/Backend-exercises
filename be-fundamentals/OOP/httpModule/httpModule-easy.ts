import axios, { AxiosInstance } from 'axios';
import { customHeaders, HttpServiceInterface } from './types';

class HttpService implements HttpServiceInterface {
  protected axios: AxiosInstance = axios.create();

  constructor() {}

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
    return this.httpService.get(link, headers);
  }

  post<T, K>(
    link: string,
    data: K | {} = {},
    headers: customHeaders = {}
  ): Promise<T> {
    return this.httpService.post(link, data, headers);
  }

  delete<T, K>(
    link: string,
    data: K | {} = {},
    headers: customHeaders = {}
  ): Promise<T> {
    return this.httpService.delete(link, data, headers);
  }
}

class CacheService extends Decorator {
  cacheArray: string[] = [];

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

    const result: Promise<T> = this.httpService.get(link, headers);

    return result;
  }
}

const exampleLink = new HttpService();
const service = new CacheService(exampleLink);

service.get('http://example.com');
