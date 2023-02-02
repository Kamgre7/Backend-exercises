import { CacheService } from './cacheService-class';
import { HttpService } from './httpService-class';

// dodać config do axiosInstance - przy tworzeniu mozliwosc dodania konfig np baseURL
// sam return - nei musi byc await
// podzielic na osobne pliki
// testy -
// header i body zawsze opcjonalnie
// dodac env - sprawdzic pod klucz i z danymi

// typy poprawic, usunac await

// test dzialania metod - czy zwraca odpowiednie dane
// cacheUrl - zrobić jako osobny plik i z niego pobie, ra dane, podawany w konstruktorze

const httpClient = new HttpService();
const requestCacheService = new CacheService(httpClient);

httpClient.get('http://example.com');

requestCacheService.get('http://example.com');
requestCacheService.post(
  'http://example.com',
  { name: 'string' },
  { 'X-example': 'asddsa' }
);
requestCacheService.delete('http://example.com');
