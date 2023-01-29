import axios from 'axios';

type userHeaders = {
  [name: string]: string;
};

interface Cache {}

export class HttpService {
  constructor() {}

  static async get<T>(urlAddress: string, headers?: userHeaders): Promise<T> {
    try {
      const url = this.stringToUrl(urlAddress);

      return headers
        ? await axios.get(url.href, { headers })
        : await axios.get(url.href);
    } catch (error) {
      console.error(error);
    }
  }

  static async post<T>(
    urlAddress: string,
    body: unknown,
    headers?: userHeaders
  ): Promise<T> {
    try {
      const url = this.stringToUrl(urlAddress);

      return headers
        ? await axios.post(url.href, body, { headers })
        : await axios.post(url.href, body);
    } catch (error) {
      console.error(error);
    }
  }

  static async delete<T>(
    urlAddress: string,
    headers?: userHeaders
  ): Promise<T> {
    try {
      const url = this.stringToUrl(urlAddress);

      return headers
        ? await axios.delete(url.href, { headers })
        : await axios.delete(url.href);
    } catch (error) {
      console.error(error);
    }
  }

  private static stringToUrl(link: string) {
    return new URL(link);
  }
}

class CacheService implements Cache {}
