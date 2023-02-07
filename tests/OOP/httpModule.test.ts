import { CacheService } from '../../be-fundamentals/OOP/httpModule/cacheService-class';
import { HttpService } from '../../be-fundamentals/OOP/httpModule/httpService-class';
import { HttpServiceInterface } from '../../be-fundamentals/OOP/httpModule/types';

const httpServiceMock: HttpServiceInterface<unknown> = {
  delete: jest.fn().mockResolvedValue('linkTest'),
  get: jest.fn().mockResolvedValue('linkTest'),
  post: jest.fn().mockResolvedValue('linkTest'),
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('Testing httpModule task - using axios instance with design pattern Decorator', () => {
  describe('httpService-class', () => {
    it('Class should be defined', () => {
      expect(HttpService).toBeDefined();
    });

    it('httpService get method should be called', async () => {
      const httpClient = httpServiceMock;

      await httpClient.get('https://example.com', {});

      expect(httpClient.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('CacheService class', () => {
    const cacheUrlDb = new Map();
    const newCacheService = new CacheService(httpServiceMock, cacheUrlDb);

    it('Class should be defined', () => {
      expect(CacheService).toBeDefined();
    });

    it('Method get of httpServiceMock should be called 1 times, next call from cacheUrlDb', async () => {
      await newCacheService.get('http://example.com');
      await newCacheService.get('http://example.com');

      expect(newCacheService.httpService.get).toHaveBeenCalledTimes(1);
      expect(cacheUrlDb.size).toBe(1);
    });

    it('Method post of httpServiceMock should be called 2 times, and return linkTest', async () => {
      const response = await newCacheService.post(
        'http://example.com',
        'randomData'
      );
      await newCacheService.post('http://example.com', 'randomData');

      expect(newCacheService.httpService.post).toHaveBeenCalledTimes(2);
      expect(response).toBe('linkTest');
    });

    it('Response should return linkTest', async () => {
      const response = await newCacheService.get('http://example.com');

      expect(response).toStrictEqual('linkTest');
    });
  });
});
