import { CacheService } from '../../be-fundamentals/OOP/httpModule/cacheService-class';
import { HttpService } from '../../be-fundamentals/OOP/httpModule/httpService-class';

const httpServiceGetMockSpy = jest
  .spyOn(HttpService.prototype, 'get')
  .mockImplementation(
    async (url: string): Promise<any> =>
      Promise.resolve({ status: 200, data: url })
  );

afterEach(() => {
  jest.clearAllMocks();
});

describe('Testing httpModule task - using axios instance with design pattern Decorator', () => {
  describe('httpService-class', () => {
    it('Class should be defined', () => {
      expect(HttpService).toBeDefined();
    });

    it('httpService get method should be called', async () => {
      const httpClient = new HttpService();

      await httpClient.get('http://localhost:80');

      expect(httpClient.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('CacheService class', () => {
    const httpClient = new HttpService();
    const cacheUrlDb = new Map();
    const newCacheService = new CacheService(httpClient, cacheUrlDb);

    it('Class should be defined', () => {
      expect(CacheService).toBeDefined();
    });

    it('Method get of httpService should be called 1 times, next call from cacheUrlDb', async () => {
      await newCacheService.get('http://example.com');
      await newCacheService.get('http://example.com');

      expect(newCacheService.httpService.get).toHaveBeenCalledTimes(1);
    });

    it('Response should return { status: 200, data: urlLink }', async () => {
      const response = await newCacheService.get('http://example.com');

      expect(response).toStrictEqual({
        status: 200,
        data: 'http://example.com',
      });
    });
  });
});
