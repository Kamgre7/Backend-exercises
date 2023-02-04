import { cacheUrlDb } from './cacheData';
import { CacheService } from './cacheService-class';
import { HttpService } from './httpService-class';

const httpClient = new HttpService({
  baseURL: 'https://example.com',
});
httpClient.get('/api');

const requestCacheService = new CacheService(httpClient, cacheUrlDb);
requestCacheService.get('/article/all');
requestCacheService.post(
  '/article',
  { title: 'new article' },
  { 'X-example': 'test' }
);
requestCacheService.delete('/article/12345');
