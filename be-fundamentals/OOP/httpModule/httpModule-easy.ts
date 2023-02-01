import axios, { AxiosInstance } from 'axios';
import { customHeaders, HttpServiceInterface } from './types';

class HttpService<T, K> implements HttpServiceInterface<T, K> {
  private axiosInstance: AxiosInstance = axios.create();

  async get(link: string, headers: customHeaders = {}): Promise<T> {
    return await this.axiosInstance.get(link, { headers });
  }

  async post(
    link: string,
    data: K | {} = {},
    headers: customHeaders = {}
  ): Promise<T> {
    return await this.axiosInstance.post(link, data, { headers });
  }

  async delete(
    link: string,
    data: K | {} = {},
    headers: customHeaders = {}
  ): Promise<T> {
    return await this.axiosInstance.delete(link, {
      headers,
      data,
    });
  }
}

class Decorator<T, K> implements HttpServiceInterface<T, K> {
  protected httpService: HttpServiceInterface<T, K>;

  constructor(httpService: HttpServiceInterface<T, K>) {
    this.httpService = httpService;
  }

  async get(link: string, headers: customHeaders = {}): Promise<T> {
    return await this.httpService.get(link, headers);
  }

  async post(
    link: string,
    data: K | {} = {},
    headers: customHeaders = {}
  ): Promise<T> {
    return await this.httpService.post(link, data, headers);
  }

  async delete(
    link: string,
    data: K | {} = {},
    headers: customHeaders = {}
  ): Promise<T> {
    return await this.httpService.delete(link, data, headers);
  }
}

class CacheService<T, K> extends Decorator<T, K> {
  cacheUrl = new Map<string, T>();

  constructor(httpService: HttpServiceInterface<T, K>) {
    super(httpService);
  }

  private checkPage(link: string) {
    return this.cacheUrl.has(link);
  }

  async get(link: string, headers: customHeaders = {}): Promise<T> {
    const checkLink = this.checkPage(link);

    if (checkLink) {
      return this.cacheUrl.get(link);
    }

    const result = await this.httpService.get(link, headers);
    this.cacheUrl.set(link, result);

    return result;
  }
}

const httpServiceExample = new HttpService();
const serviceCache = new CacheService(httpServiceExample);

httpServiceExample.get('http://example.com');
serviceCache.get('http://example.com');
serviceCache.post(
  'http://example.com',
  { name: 'string' },
  { 'X-example': 'example-header' }
);
serviceCache.delete('http://example.com');
